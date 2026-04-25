const fs = require('fs');
const path = require('path');

module.exports = {
    command: ['leaderboard', 'top', 'richest', 'leaders', 'gang'],
    async execute(ctx) {
        const { reply, commandName } = ctx;

        const dbPath = path.join(__dirname, '../economy.json');
        let db = {};
        
        if (fs.existsSync(dbPath)) {
            db = JSON.parse(fs.readFileSync(dbPath));
        }

        // Get top users by balance
        const users = Object.entries(db)
            .map(([id, data]) => ({
                id,
                balance: data.balance || 0
            }))
            .sort((a, b) => b.balance - a.balance)
            .slice(0, 10);

        if (commandName === 'leaderboard' || commandName === 'top' || commandName === 'richest' || commandName === 'leaders') {
            if (users.length === 0) {
                return reply('*⚠️ No gang members have earned coins yet!*');
            }

            let leaderboard = `╔════════════════════════════════════════════╗
║        ⚡ G A N G  L E A D E R B O A R D ⚡ ║
╚════════════════════════════════════════════╝

📊 *Top Earners of the Peaky Blinders*

`;

            users.forEach((user, index) => {
                const medals = ['🥇', '🥈', '🥉'];
                const medal = medals[index] || `#${index + 1}`;
                leaderboard += `${medal} ${user.id.padEnd(12)} | ${user.balance} Peaky Coins ⚡\n`;
            });

            leaderboard += `
╔════════════════════════════════════════════╗

*"Money is order, and order is everything."*
— Tommy Shelby

*Rank up by working and winning!* 💪`;

            return reply(leaderboard);
        }

        if (commandName === 'gang') {
            const config = require('../config');
            return reply(`╔════════════════════════════════════════════╗
║       ⚡ P E A K Y  B L I N D E R S ⚡    ║
║        — G A N G  I N F O R M A T I O N  ║
╚════════════════════════════════════════════╝

🎩 *Gang Name:* ${config.botName}
👑 *Boss:* ${config.ownerName}
📍 *Territory:* ${config.location}
🌍 *Organization:* Peaky Blinders

*Active Members:* ${Object.keys(db).length}
💰 *Total Wealth:* ${Object.values(db).reduce((sum, user) => sum + (user.balance || 0), 0)} Peaky Coins ⚡

*Structure:*
🔴 Tommy Shelby (Boss)
🟠 Gang Officers
🟡 Soldiers
🟢 Recruits

*By Order of the Peaky Blinders* ⚔️

*"The business is family. Everything else is just noise."*

╔════════════════════════════════════════════╗`);
        }
    }
};
