const config = require('../config');

module.exports = {
    command: ['alive'],
    async execute(ctx) {
        const { reply, pushName, sock, msg } = ctx;

        const aliveMsg = `
╔════════════════════════════════════════════╗
║     ⚡ P E A K Y  B L I N D E R S ⚡      ║
║ Welcome to the Garrison, ${pushName}! 🎩
╚════════════════════════════════════════════╝

*"You are not a good man. You know how I know? Because a good man doesn't think about the dead."*

— Tommy Shelby

*Status:* ✅ Active and Ready
*Gang:* ${config.botName}
*Boss:* ${config.ownerName}
*Prefix:* ${config.prefix}
*Territory:* ${config.location}
*Mode:* ${config.workType.toUpperCase()}

*The Blades are Sharp ⚔️*
*The Shop is Open 🏪*
*The Whiskey is Cold 🥃*

╔════════════════════════════════════════════╗
*⚡ By Order of the Peaky Blinders ⚡*
        `.trim();

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: config.thomasImages.alive },
                caption: aliveMsg,
            }, { quoted: msg });
        } catch (e) {
            await reply(aliveMsg);
        }
    }
};
