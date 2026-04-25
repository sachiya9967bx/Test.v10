const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const NodeCache = require('node-cache');
const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const { handler } = require('./handler');
const config = require('./config');

const usePairingCode = true; // Set to false to use QR code instead
const msgRetryCounterCache = new NodeCache();
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve);
    });
};

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);
    const { version, isLatest } = await fetchLatestBaileysVersion();

    console.log(chalk.cyan(`
╔════════════════════════════════════════════╗
║     ⚡ P E A K Y  B L I N D E R S ⚡      ║
║   — The Sharpest Blades in Birmingham —   ║
║                                            ║
║    "The business is family. Everything     ║
║     else is just noise." - Tommy Shelby    ║
╚════════════════════════════════════════════╝
    `));
    console.log(chalk.gray(`[Peaky] Bot Version: 2.0.0`));
    console.log(chalk.gray(`[Peaky] Using WA v${version.join('.')}, isLatest: ${isLatest}`));
    console.log(chalk.yellow(`[Peaky] Gang Territory: ${config.location}`));

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !usePairingCode,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
        },
        browser: Browsers.macOS('Desktop'),
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
    });

    if (usePairingCode && !sock.authState.creds.registered) {
        let phoneNumber = process.env.PAIRING_NUMBER || config.pairingNumber || '';

        if (!phoneNumber) {
            phoneNumber = await question(chalk.cyan('[Peaky] Enter your WhatsApp number (with country code):\n'));
        } else {
            console.log(chalk.cyan(`[Peaky] Using WhatsApp number from config/env: ${phoneNumber}`));
        }

        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        let code = await sock.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join('-') || code;

        console.log(chalk.yellow.bold(`
╔══════════════════════════════════════════╗
║   ⚔️  P A I R I N G   R E Q U E S T E D ║
╠══════════════════════════════════════════╣
║        Your Pairing Code is:             ║
║             ${chalk.green.bold(code)}                  ║
╚══════════════════════════════════════════╝
        `));
        console.log(chalk.white(`[Peaky] Please enter this code in your WhatsApp linked devices.`));
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log(chalk.red(`[Peaky] Connection closed. Reason: ${reason}`));
            if (reason !== DisconnectReason.loggedOut) {
                if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                    console.log(chalk.red('[Peaky] Max reconnection attempts reached. Giving up.'));
                    return;
                }
                reconnectAttempts++;
                console.log(chalk.yellow(`[Peaky] Reopening the shop... (Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`));
                setTimeout(startBot, 3000);
            } else {
                console.log(chalk.red('[Peaky] Kicked out! Starting fresh...'));
                fs.rmSync(config.sessionName, { recursive: true, force: true });
                reconnectAttempts = 0;
                startBot();
            }
        } else if (connection === 'open') {
            reconnectAttempts = 0;
            console.log(chalk.green.bold(`
╔════════════════════════════════════════════╗
║     ⚡ B L A D E S   S H A R P ⚡          ║
║  — Connected to the Garrison! —            ║
║                                            ║
║  All Systems Ready for Operation           ║
║  The Peaky Blinders are back in business.  ║
╚════════════════════════════════════════════╝
            `));
            console.log(chalk.green(`[Peaky] Bot is ONLINE and ARMED ⚡`));
            console.log(chalk.green(`[Peaky] Ready to execute commands for ${config.location}`));
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // ⚔️ ANTICALL FEATURE ⚔️
    sock.ev.on('call', async (callData) => {
        if (config.anticall) {
            for (const call of callData) {
                if (call.status === 'offer') {
                    await sock.rejectCall(call.id, call.from);
                    console.log(chalk.red(`[Peaky] ⚔️ Call rejected from: ${call.from}`));

                    // Send warning message
                    await sock.sendMessage(call.from, {
                        text: `╔════════════════════════════════════════╗
║      ⚔️  CALL REJECTED  ⚔️              ║
╠════════════════════════════════════════╣
║  "We don't take calls here, mate."     ║
║  - Thomas Shelby                       ║
║                                        ║
║  Please send a message instead.        ║
╚════════════════════════════════════════╝`
                    });
                }
            }
        }
    });

    // ⚔️ AUTO REACT TO STATUS ⚔️
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const msg = messages[0];
        if (!msg.message) return;
        msg.sender = msg.key.participant || msg.key.remoteJid;

        // Auto React to Status Updates
        if (config.autoReactStatus && msg.key.remoteJid === 'status@broadcast') {
            try {
                const randomEmoji = config.statusEmojis[Math.floor(Math.random() * config.statusEmojis.length)];
                await sock.sendMessage(msg.key.remoteJid, {
                    react: {
                        text: randomEmoji,
                        key: msg.key
                    }
                }, { statusJidList: [msg.sender] });
                console.log(chalk.green(`[Peaky] ⚔️ Reacted to status from: ${msg.sender.split('@')[0]} with ${randomEmoji}`));
            } catch (err) {
                console.error(chalk.red('[Peaky] Status react error:'), err.message);
            }
        }

        // ⚔️ AUTO RECORDING (Voice Notes) ⚔️
        if (config.autoRecording && (msg.message.audioMessage || msg.message.voiceMessage)) {
            try {
                const audioMsg = msg.message.audioMessage || msg.message.voiceMessage;
                const buffer = await sock.downloadMediaMessage(msg);

                // Create recordings directory if it doesn't exist
                const recordingsDir = './recordings';
                if (!fs.existsSync(recordingsDir)) {
                    fs.mkdirSync(recordingsDir);
                }

                const fileName = `${recordingsDir}/voice_${Date.now()}_${msg.sender.split('@')[0]}.ogg`;
                fs.writeFileSync(fileName, buffer);
                console.log(chalk.green(`[Peaky] ⚔️ Voice recorded: ${fileName}`));
            } catch (err) {
                console.error(chalk.red('[Peaky] Recording error:'), err.message);
            }
        }

        // ⚔️ AUTO REACT TO MESSAGES ⚔️
        if (config.autoReact && !msg.key.fromMe && msg.key.remoteJid !== 'status@broadcast') {
            try {
                // Don't react to commands
                const messageText = msg.message.conversation ||
                    msg.message.extendedTextMessage?.text ||
                    msg.message.imageMessage?.caption ||
                    msg.message.videoMessage?.caption || '';

                if (!messageText.startsWith(config.prefix)) {
                    // Random chance to react (30% chance)
                    if (Math.random() < 0.3) {
                        await sock.sendMessage(msg.key.remoteJid, {
                            react: {
                                text: config.autoReactEmoji,
                                key: msg.key
                            }
                        });
                        console.log(chalk.cyan(`[Peaky] ⚔️ Auto-reacted to message from: ${msg.sender.split('@')[0]}`));
                    }
                }
            } catch (err) {
                console.error(chalk.red('[Peaky] Auto-react error:'), err.message);
            }
        }

        // Pass message to handler
        handler(sock, msg, config);
    });
}

startBot();
