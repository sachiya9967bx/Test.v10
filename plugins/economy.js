const fs = require('fs');
const path = require('path');
const config = require('../config');

const dbPath = path.join(__dirname, '../economy.json');

function readDB() {
    if (!fs.existsSync(dbPath)) return {};
    return JSON.parse(fs.readFileSync(dbPath));
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
    command: ['work', 'bal', 'balance', 'give', 'rob', 'gamble'],
    async execute(ctx) {
        const { msg, args, reply, sender, pushName, commandName } = ctx;
        const db = readDB();
        const userId = sender.split('@')[0];

        if (!db[userId]) db[userId] = { balance: 0, lastWork: 0 };

        if (commandName === 'work') {
            const now = Date.now();
            const cooldown = 300000; // 5 minutes
            if (now - db[userId].lastWork < cooldown) {
                const remaining = Math.ceil((cooldown - (now - db[userId].lastWork)) / 60000);
                return reply(`*⚠️ Too soon, mate! The coppers are watching.* 🚓\n\n*Wait ${remaining} more minutes before the next job.*`);
            }

            const earned = Math.floor(Math.random() * 500) + 100;
            db[userId].balance += earned;
            db[userId].lastWork = now;
            writeDB(db);

            const jobs = [
                "Heisted a local pub 🍺",
                "Fixed a horse race 🐴",
                "Collected protection money 💰",
                "Smuggled some gin 🥃",
                "Stripped a car for parts 🚗"
            ];
            const job = jobs[Math.floor(Math.random() * jobs.length)];

            return reply(`╔════════════════════════════════════════════╗
║         ⚡ J O B  C O M P L E T E D ⚡    ║
╚════════════════════════════════════════════╝

💼 *Work Assignment:* ${job}

💸 *Earned:* ${earned} Peaky Coins ⚡
💰 *New Balance:* ${db[userId].balance} ⚡

*"Good fortune, mate. The Garrison approves."* — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'bal' || commandName === 'balance') {
            return reply(`╔════════════════════════════════════════════╗
║          ⚡ G A R R I S O N  B A N K ⚡   ║
╚════════════════════════════════════════════╝

👨 *Account Holder:* ${pushName}
💳 *Account Type:* Premium Gang Account
💰 *Balance:* ${db[userId].balance} Peaky Coins ⚡

*Status:* ✅ In Good Standing
*Reputation:* Rising

*"Money is order, and order is everything."* — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'give') {
            const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
            if (mentionedJid.length === 0) return reply('*⚠️ Who are ya givin coins to? Mention someone!*');

            const amount = parseInt(args[1]);
            if (isNaN(amount) || amount <= 0) return reply('*⚠️ How much coins? Be precise!*');

            if (db[userId].balance < amount) return reply('*⚠️ You ain\'t got that much coin, mate! 💸*');

            const targetId = mentionedJid[0].split('@')[0];
            if (!db[targetId]) db[targetId] = { balance: 0, lastWork: 0 };

            db[userId].balance -= amount;
            db[targetId].balance += amount;
            writeDB(db);

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ T R A N S F E R  C O M P L E T E ⚡  ║
╚════════════════════════════════════════════╝

🤝 *Deal Sealed!*

💸 *Amount Sent:* ${amount} Peaky Coins ⚡
👤 *Recipient:* @${targetId}
💰 *Your New Balance:* ${db[userId].balance} ⚡

*"Loyalty is everything in this business."* — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        // Simplified Rob & Gamble integration could go here or in separate plugins
    }
};
