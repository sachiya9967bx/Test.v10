const config = require('../config');

module.exports = {
    command: ['hidetag', 'tagall', 'whisper'],
    async execute(ctx) {
        const { sock, msg, text, reply, isOwner } = ctx;
        const jid = msg.key.remoteJid;

        if (!jid.endsWith('@g.us')) return reply('*⚠️ This is gang business! Groups only! 🏘️*');

        // Check if admin/owner is needed - simplified for here
        const groupMetadata = await sock.groupMetadata(jid);
        const participants = groupMetadata.participants;

        const tagText = text || `╔════════════════════════════════════════════╗
║      ⚡ A T T E N T I O N ⚡              ║
║      — Peaky Blinders Message —           ║
╚════════════════════════════════════════════╝

🎩 *ATTENTION ALL MEMBERS!*

This is an announcement from the Garrison.

"By order of the Peaky Blinders!" ⚔️

*— The Leadership has spoken* 👑`;
        const mentions = participants.map(p => p.id);

        await sock.sendMessage(jid, {
            text: tagText,
            mentions: mentions
        });

        await reply('*✅ Message whispered to all members!*');
    }
};
