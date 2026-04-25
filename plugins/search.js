const axios = require('axios');
const config = require('../config');

module.exports = {
    command: ['google', 'wiki', 'search', 'find'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (!text) return reply(`*⚠️ What are ya lookin' for? Tell me what to find! 🔍*`);

        if (commandName === 'wiki') {
            try {
                const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`);
                const data = response.data;
                const wikiInfo = `╔════════════════════════════════════════════╗
║      ⚡ T H E  A R C H I V E S ⚡       ║
╚════════════════════════════════════════════╝

📚 *Subject:* ${data.title}

${data.extract}

*— Knowledge is power, mate!* ⚡

╔════════════════════════════════════════════╗`;
                return reply(wikiInfo);
            } catch (err) {
                return reply(`*⚠️ I couldn't find anything on that in the archives!*`);
            }
        }

        if (commandName === 'google' || commandName === 'search' || commandName === 'find') {
            const googleLink = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ G O O G L E  S E A R C H ⚡   ║
╚════════════════════════════════════════════╝

🔍 *Query:* ${text}

🌐 *Link:* ${googleLink}

*— Keep your eyes sharp!* ⚡
*Search with the cunning of the Shelby's* 🧠

╔════════════════════════════════════════════╗`);
        }
    }
};
