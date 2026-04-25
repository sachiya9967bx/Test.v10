const axios = require('axios');

module.exports = {
    command: ['weather', 'time', 'date', 'timezone'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (commandName === 'weather') {
            if (!text) {
                return reply('*⚠️ Which city, mate?*\n\nExample: .weather Birmingham');
            }

            return reply(`╔════════════════════════════════════════════╗
║         ⚡ W E A T H E R  R E P O R T ⚡  ║
╚════════════════════════════════════════════╝

🌤️ *Location:* ${text}

Check weather at: https://wttr.in/${encodeURIComponent(text)}

*"Know the weather, control the timing."* — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'time') {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ C U R R E N T  T I M E ⚡   ║
╚════════════════════════════════════════════╝

⏰ *Time:* ${timeString}
📅 *Date:* ${now.toDateString()}
🌍 *Timezone:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}

*"Time is the most valuable currency."* — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'date') {
            const now = new Date();
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ C U R R E N T  D A T E ⚡   ║
╚════════════════════════════════════════════╝

📅 *Full Date:* ${dateString}
🗓️ *Short:* ${now.toLocaleDateString()}
⏰ *Time:* ${now.toLocaleTimeString()}

*"Every date marks history in the making."* 📖

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'timezone') {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const now = new Date();
            const offset = -now.getTimezoneOffset() / 60;

            return reply(`╔════════════════════════════════════════════╗
║         ⚡ T I M E Z O N E  I N F O ⚡  ║
╚════════════════════════════════════════════╝

🌍 *Timezone:* ${tz}
⏰ *UTC Offset:* ${offset >= 0 ? '+' : ''}${offset}:00
📍 *Current Time:* ${now.toLocaleTimeString()}

*"Synchronize across territories."* 🌐

╔════════════════════════════════════════════╗`);
        }
    }
};
