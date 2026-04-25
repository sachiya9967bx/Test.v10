const config = require('../config');

module.exports = {
    command: ['repo', 'repository', 'source', 'git'],
    async execute(ctx) {
        const { sock, msg, reply } = ctx;

        const repoText = `
╔════════════════════════════════════════════╗
║     ⚡ P E A K Y  R E P O S I T O R Y ⚡   ║
╚════════════════════════════════════════════╝

*📦 Project:* JEWISH MD (Peaky Features)
*🌐 Repository:* ${config.repoUrl}
*🧩 Plugins:* 27+
*⚔️ Commands:* 150+

*🔧 Quick Setup*
1. Clone the repo
2. Install dependencies
3. Start bot with node index.js
4. Use session site for pairing code

*📱 Session Site:* ${config.repoUrl}/tree/master/session-site

⚡ *By Order of the Peaky Blinders* ⚡
        `.trim();

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: config.thomasImages.repo },
                caption: repoText,
            }, { quoted: msg });
        } catch (e) {
            await reply(repoText);
        }
    }
};
