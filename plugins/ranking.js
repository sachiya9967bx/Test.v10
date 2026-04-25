module.exports = {
    command: ['rank', 'level', 'stats', 'profile', 'userinfo'],
    async execute(ctx) {
        const { msg, sender, reply, pushName, commandName } = ctx;
        const userId = sender.split('@')[0];

        // Read economy data for ranking
        const fs = require('fs');
        const path = require('path');
        const dbPath = path.join(__dirname, '../economy.json');

        let db = {};
        if (fs.existsSync(dbPath)) {
            db = JSON.parse(fs.readFileSync(dbPath));
        }

        const userBalance = db[userId]?.balance || 0;

        // Determine rank based on balance
        let rank = 'Recruit';
        let badge = '⚪';
        if (userBalance >= 5000) { rank = 'Soldier'; badge = '🟢'; }
        if (userBalance >= 10000) { rank = 'Lieutenant'; badge = '🔵'; }
        if (userBalance >= 20000) { rank = 'Captain'; badge = '🟣'; }
        if (userBalance >= 50000) { rank = 'Major'; badge = '🟠'; }
        if (userBalance >= 100000) { rank = 'Colonel'; badge = '🔴'; }

        if (commandName === 'rank' || commandName === 'level') {
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ G A N G  R A N K ⚡         ║
╚════════════════════════════════════════════╝

👤 *Soldier:* ${pushName}
🆔 *ID:* ${userId}
💳 *Rank:* ${badge} ${rank}
💰 *Balance:* ${userBalance} Peaky Coins ⚡

*Progression:*
🟢 Soldier: 5,000⚡
🔵 Lieutenant: 10,000⚡
🟣 Captain: 20,000⚡
🟠 Major: 50,000⚡
🔴 Colonel: 100,000⚡

*"Rise in the ranks, earn your respect."* — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'stats') {
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ S O L D I E R  S T A T S ⚡   ║
╚════════════════════════════════════════════╝

👤 *Name:* ${pushName}
💰 *Wealth:* ${userBalance} Peaky Coins ⚡
🎖️ *Rank:* ${rank}
📊 *Experience:* ${Math.floor(userBalance / 100)}XP
⚔️ *Combat Ready:* YES
💪 *Loyalty:* Maximum

*— A valuable member of the gang* 👑

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'profile') {
            const jobsDone = db[userId]?.jobsDone || 0;
            return reply(`╔════════════════════════════════════════════╗
║       ⚡ G A N G  M E M B E R  P R O F I L E ⚡║
╚════════════════════════════════════════════╝

🎩 *Name:* ${pushName}
📞 *Contact:* ${userId}
💼 *Status:* ACTIVE
💰 *Net Worth:* ${userBalance} Peaky Coins ⚡
🎖️ *Rank:* ${rank}
📈 *Jobs Completed:* ${jobsDone}

*Loyalty Level:* ████████░░ 80%
*Trust Level:* ███████░░░ 70%
*Reliability:* █████████░ 90%

"You've earned a place at the table." — Tommy Shelby

╔════════════════════════════════════════════╝`);
        }

        if (commandName === 'userinfo') {
            return reply(`╔════════════════════════════════════════════╗
║        ⚡ U S E R  I N F O R M A T I O N ⚡ ║
╚════════════════════════════════════════════╝

👤 *Username:* ${pushName}
🆔 *User ID:* ${userId}
💳 *Gang Status:* ${rank}
💰 *Account Balance:* ${userBalance}⚡
📱 *Platform:* WhatsApp
🌍 *Territory:* Birmingham Network

*Account Activity:*
✅ Active Member
📍 Locations: Garrison
🔐 Security: Protected

*— Registered in the Shelby Book* 📖

╔════════════════════════════════════════════╗`);
        }
    }
};
