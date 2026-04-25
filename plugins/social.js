module.exports = {
    command: ['igdl', 'tiktok', 'twitter', 'fb', 'facebook', 'instagram'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (!text) {
            return reply('*⚠️ URL required, mate!*\n\nExample: .igdl <instagram-url>');
        }

        if (commandName === 'igdl' || commandName === 'instagram') {
            return reply(`╔════════════════════════════════════════════╗
║    ⚡ I N S T A G R A M  D O W N L O A D ⚡ ║
╚════════════════════════════════════════════╝

📸 *Processing Instagram link...*

*URL:* ${text}

Use: https://inflact.com/downloader/instagram/

*"Social media is the modern battlefield."* 📱

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'tiktok') {
            return reply(`╔════════════════════════════════════════════╗
║      ⚡ T I K T O K  D O W N L O A D ⚡   ║
╚════════════════════════════════════════════╝

🎵 *Processing TikTok link...*

*URL:* ${text}

Use: https://snaptik.app/

*"Capture the moment, own the content."* 🎬

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'twitter') {
            return reply(`╔════════════════════════════════════════════╗
║      ⚡ T W I T T E R  D O W N L O A D ⚡  ║
╚════════════════════════════════════════════╝

🐦 *Processing Twitter link...*

*URL:* ${text}

Use: https://twittervideodownloader.com/

*"Information spreads like wildfire."* 🔥

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'fb' || commandName === 'facebook') {
            return reply(`╔════════════════════════════════════════════╗
║     ⚡ F A C E B O O K  D O W N L O A D ⚡ ║
╚════════════════════════════════════════════╝

📘 *Processing Facebook link...*

*URL:* ${text}

Use: https://www.getfbstuff.com/

*"Every network is an opportunity."* 🌐

╔════════════════════════════════════════════╗`);
        }
    }
};
