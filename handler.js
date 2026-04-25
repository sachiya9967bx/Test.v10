const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const pluginsDir = path.join(__dirname, 'plugins');
const plugins = {};

// Store user menu states for interactive menu
const userMenuStates = {};

// Utility for sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Load all plugins dynamically
if (!fs.existsSync(pluginsDir)) {
    fs.mkdirSync(pluginsDir);
}

fs.readdirSync(pluginsDir).forEach(file => {
    if (file.endsWith('.js')) {
        const pluginName = path.basename(file, '.js');
        plugins[pluginName] = require(path.join(pluginsDir, file));
        console.log(chalk.green(`[Peaky] ⚔️ Loaded blade: ${pluginName}`));
    }
});

exports.handler = async (sock, msg, config) => {
    try {
        const m = msg.message;
        const text = m.conversation ||
            m.extendedTextMessage?.text ||
            m.imageMessage?.caption ||
            m.videoMessage?.caption || '';

        const sender = msg.sender;

        // ⚔️ INTERACTIVE MENU - Number Selection ⚔️
        if (userMenuStates[sender]) {
            const timeElapsed = Date.now() - userMenuStates[sender].timestamp;
            if (timeElapsed > 60000) {
                // Menu expired after 60 seconds
                delete userMenuStates[sender];
            } else if (/^[1-8]$/.test(text.trim()) && !text.startsWith(config.prefix)) {
                await handleMenuSelection(sock, msg, text.trim(), userMenuStates[sender].state, config);
                delete userMenuStates[sender]; // Close menu after selection
                return;
            }
        }

        if (!text.startsWith(config.prefix)) return;

        const args = text.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const isOwner = config.ownerNumbers.includes(msg.sender.split('@')[0]);
        if (config.workType === 'private' && !isOwner) return;

        // Command matching
        for (const [name, plugin] of Object.entries(plugins)) {
            if (plugin.command && plugin.command.includes(commandName)) {

                // 🌟 ANIMATED LOADING SEQUENCE 🌟
                const loadingMsg = await sock.sendMessage(msg.key.remoteJid, { text: '⚡ _Connecting to the Garrison..._' }, { quoted: msg });
                await sleep(500);
                await sock.sendMessage(msg.key.remoteJid, { text: '⚔️ _Sharpening Blades..._', edit: loadingMsg.key });
                await sleep(500);
                await sock.sendMessage(msg.key.remoteJid, { text: '🎩 _By order of the Peaky Blinders... executing._', edit: loadingMsg.key });
                await sleep(500);
                // Delete the loading message to keep chat clean (optional, or just leave the edited success message)
                await sock.sendMessage(msg.key.remoteJid, { delete: loadingMsg.key });

                // Construct a helpful context object to pass to plugins
                const ctx = {
                    sock,
                    msg,
                    args,
                    text: args.join(' '),
                    sender: msg.sender,
                    isOwner,
                    pushName: msg.pushName || 'Gentleman',
                    commandName,
                    reply: async (text) => await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg }),
                };

                await plugin.execute(ctx);
                console.log(chalk.cyan(`[Peaky] ⚔️ Blade struck: ${commandName} | Assassin: ${msg.sender.split('@')[0]}`));

                // Track menu state if menu/interactive command
                if (['menu', 'help', 'hmenu', 'interactive'].includes(commandName)) {
                    userMenuStates[sender] = { state: 'main', timestamp: Date.now() };
                }
                break;
            }
        }
    } catch (err) {
        console.error(chalk.red('[Peaky] Error!'), err);
    }
};

// Handle interactive menu number selections
async function handleMenuSelection(sock, msg, selection, currentMenu, config) {
    const menus = {
        '1': { title: '📥 DOWNLOAD', cmds: '.igdl, .tiktok, .ytmp3, .ytmp4, .twitter, .fb, .song, .lyrics' },
        '2': { title: '⚙️ SETTINGS', cmds: '.prefix, .anticall, .autoreact, .afk, .back, .settings' },
        '3': { title: '🎮 FUN', cmds: '.gamble, .flip, .dice, .rps, .riddle, .joke, .quote' },
        '4': { title: '🛠️ TOOLS', cmds: '.sticker, .attp, .qr, .reverse, .calc, .convert, .tts' },
        '5': { title: '📱 INFO', cmds: '.weather, .time, .date, .timezone, .userinfo, .anime' },
        '6': { title: '👑 ADMIN', cmds: '.promote, .demote, .kick, .mute, .warn, .hidetag, .groupinfo' },
        '7': { title: '💰 ECONOMY', cmds: '.work, .bal, .give, .rob, .rank, .stats, .leaderboard' },
        '8': { title: '🎵 MUSIC', cmds: '.song, .lyrics, .ytmp3, .ytmp4' },
    };

    if (menus[selection]) {
        const menu = menus[selection];
        const responseText = `
╔════════════════════════════════════════════╗
║  ${menu.title} COMMANDS
╚════════════════════════════════════════════╝

*Available Commands:*
${menu.cmds}

*⟶ Type .menu to return to main menu*

╚════════════════════════════════════════════╝`;

        await sock.sendMessage(msg.key.remoteJid, { text: responseText }, { quoted: msg });
    }
}
