const axios = require('axios');

module.exports = {
    command: ['anime', 'manga', 'character', 'waifu', 'husbando'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (commandName === 'anime') {
            if (!text) {
                return reply('*⚠️ Which anime are you searching for, mate?*\n\nExample: .anime Naruto');
            }

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ A N I M E  S E A R C H ⚡    ║
╚════════════════════════════════════════════╝

🎬 *Searching for:* ${text}

📺 Check out: https://myanimelist.net/search/all?q=${encodeURIComponent(text)}

*"Even the Shelbys appreciate good stories."* 📖

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'manga') {
            if (!text) {
                return reply('*⚠️ Which manga, mate?*\n\nExample: .manga One Piece');
            }

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ M A N G A  S E A R C H ⚡    ║
╚════════════════════════════════════════════╝

📚 *Searching for:* ${text}

📖 Link: https://myanimelist.net/manga.php?q=${encodeURIComponent(text)}

*"Knowledge from all corners, mate."* 🗺️

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'waifu') {
            return reply(`╔════════════════════════════════════════════╗
║            ⚡ W A I F U ⚡             ║
╚════════════════════════════════════════════╝

💕 *Random Waifu Generated!*

"Even soldiers need moments of joy." — Arthur Shelby

Get your waifu at: https://waifu.pics/

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'character') {
            if (!text) {
                return reply('*⚠️ Which character?*');
            }

            return reply(`╔════════════════════════════════════════════╗
║       ⚡ C H A R A C T E R  I N F O ⚡   ║
╚════════════════════════════════════════════╝

👤 *Searching:* ${text}

"Every character has their story, just like every Shelby." 🎭

╔════════════════════════════════════════════╗`);
        }
    }
};
