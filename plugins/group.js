const config = require('../config');

module.exports = {
    command: ['promote', 'demote', 'kick'],
    async execute(ctx) {
        const { sock, msg, args, reply, commandName, isOwner } = ctx;

        // This is a basic implementation. In a real-world bot, you need to check
        // if the bot is admin, if the user executing is admin, etc.
        const jid = msg.key.remoteJid;
        if (!jid.endsWith('@g.us')) return reply('*⚠️ This is gang business! Groups only! 🏘️*');

        // Only owner can use group management commands
        if (!isOwner) return reply('*⚠️ Only the Boss can use this command! 👑*');

        // Find mentioned users
        const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        if (mentionedJid.length === 0) return reply('*⚠️ Who are ya talkin about? Mention someone! ⚔️*');

        const user = mentionedJid[0];

        try {
            if (commandName === 'kick') {
                await sock.groupParticipantsUpdate(jid, [user], 'remove');
                await reply(`╔════════════════════════════════════════════╗
║          ⚡ M E M B E R  K I C K E D ⚡    ║
╚════════════════════════════════════════════╝

💀 *OUT OF THE GANG!*

They've been thrown out of the Garrison.
The Peaky Blinders have spoken.

"Those who betray us, face the consequences." 

╔════════════════════════════════════════════╗`);
            } else if (commandName === 'promote') {
                await sock.groupParticipantsUpdate(jid, [user], 'promote');
                await reply(`╔════════════════════════════════════════════╗
║        ⚡ M E M B E R  P R O M O T E D ⚡  ║
╚════════════════════════════════════════════╝

👑 *RISE TO POWER!*

This soldier has been promoted.
They now hold authority in the gang.

"By order of the Peaky Blinders!" ⚔️

╔════════════════════════════════════════════╗`);
            } else if (commandName === 'demote') {
                await sock.groupParticipantsUpdate(jid, [user], 'demote');
                await reply(`╔════════════════════════════════════════════╗
║        ⚡ M E M B E R  D E M O T E D ⚡    ║
╚════════════════════════════════════════════╝

📉 *FALL FROM POWER!*

This soldier has been demoted.
Back to the ranks with you.

"Everyone answers to the Boss." — Tommy Shelby

╔════════════════════════════════════════════╗`);
            }
        } catch (err) {
            await reply('*⚠️ Failed! I ain\'t got the power for this! 🚫*');
        }
    }
};
