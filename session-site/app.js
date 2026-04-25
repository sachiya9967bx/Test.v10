const express = require('express');
const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// Store pending pairing codes
const pendingCodes = new Map();

// Serve static files
app.use(express.static(publicDir));
app.use(express.json());

// ⚡ HOME PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/health', (req, res) => {
    res.status(200).json({ ok: true, service: 'jewish-md-session-site' });
});

// ⚡ REQUEST PAIRING CODE
app.post('/api/request-code', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ error: 'Phone number required' });
        }

        const sessionId = `session_${Date.now()}`;
        const sessionPath = path.join(__dirname, 'sessions', sessionId);

        // Create session directory
        if (!fs.existsSync(path.join(__dirname, 'sessions'))) {
            fs.mkdirSync(path.join(__dirname, 'sessions'), { recursive: true });
        }

        console.log(`📱 Creating session for: ${phoneNumber}`);

        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
        const { version } = await fetchLatestBaileysVersion();

        const sock = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            auth: state,
            browser: ['Peaky Blinders', 'Safari', '1.0.0']
        });

        // Request pairing code
        const code = await sock.requestPairingCode(phoneNumber);
        const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;

        // Store code info
        pendingCodes.set(sessionId, {
            code: formattedCode,
            phoneNumber,
            createdAt: new Date(),
            sock,
            sessionPath,
            saveCreds
        });

        console.log(`✅ Code generated: ${formattedCode}`);

        // Handle connection
        sock.ev.on('connection.update', async (update) => {
            if (update.connection === 'open') {
                console.log(`🔐 Session authenticated: ${phoneNumber}`);
                
                // Save credentials
                try {
                    const credPath = path.join(sessionPath, 'creds.json');
                    if (fs.existsSync(credPath)) {
                        const credData = fs.readFileSync(credPath, 'utf-8');
                        pendingCodes.set(sessionId, {
                            ...pendingCodes.get(sessionId),
                            credentials: credData,
                            authenticated: true
                        });
                    }
                } catch (err) {
                    console.error('Error saving credentials:', err);
                }
            }
        });

        sock.ev.on('creds.update', saveCreds);

        res.json({
            success: true,
            sessionId,
            code: formattedCode,
            phoneNumber,
            message: '✅ Pairing code generated! Enter it in WhatsApp'
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ⚡ CHECK SESSION STATUS
app.get('/api/status/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const session = pendingCodes.get(sessionId);

    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
        sessionId,
        code: session.code,
        phoneNumber: session.phoneNumber,
        authenticated: session.authenticated || false,
        createdAt: session.createdAt,
        age: Math.floor((new Date() - session.createdAt) / 1000) + 's'
    });
});

// ⚡ DOWNLOAD SESSION
app.get('/api/download/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const session = pendingCodes.get(sessionId);

    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    if (!session.authenticated) {
        return res.status(400).json({ error: 'Session not authenticated yet' });
    }

    try {
        const sessionPath = session.sessionPath;
        const credPath = path.join(sessionPath, 'creds.json');

        if (fs.existsSync(credPath)) {
            const credData = fs.readFileSync(credPath);
            res.setHeader('Content-Disposition', 'attachment; filename=creds.json');
            res.setHeader('Content-Type', 'application/json');
            res.send(credData);
        } else {
            res.status(404).json({ error: 'Credentials file not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ⚡ CLEANUP OLD SESSIONS
setInterval(() => {
    const now = new Date();
    for (const [sessionId, session] of pendingCodes.entries()) {
        const age = (now - session.createdAt) / 1000 / 60; // minutes
        if (age > 30) { // Delete after 30 minutes
            pendingCodes.delete(sessionId);
            console.log(`🗑️ Cleaned up session: ${sessionId}`);
        }
    }
}, 60000); // Check every minute

// ⚡ START SERVER
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════
║  🐼 ᴄʏʙᴇʀ ᴘᴀɴᴅᴀ ᴍᴅ 🐼
║  Running on: http://localhost:${PORT}     
╚══════════════════════════
    `);
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        hint: 'Use / for UI, /health for status, and /api/* endpoints for session APIs'
    });
});
