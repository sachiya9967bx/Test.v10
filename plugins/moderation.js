module.exports = {
    command: ['mute', 'unmute', 'warn', 'warnings', 'block', 'unblock'],
    async execute(ctx) {
        const { sock, msg, text, reply, commandName, isOwner } = ctx;
        const jid = msg.key.remoteJid;

        if (!jid.endsWith('@g.us')) {
            return reply('*⚠️ This is gang business! Groups only! 🏘️*');
        }

        const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        if (mentionedJid.length === 0 && commandName !== 'warnings') {
            return reply('*⚠️ Mention someone, mate! ⚔️*');
        }

        const user = mentionedJid[0];

        if (commandName === 'mute') {
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ M E M B E R  M U T E D ⚡    ║
╚════════════════════════════════════════════╝

🔇 *Silence Enforced!*

This soldier has been silenced.
They may listen, but not speak.

"Know when to hold your tongue." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'unmute') {
            return reply(`╔════════════════════════════════════════════╗
║        ⚡ M E M B E R  U N M U T E D ⚡  ║
╚════════════════════════════════════════════╝

🔊 *Voice Restored!*

This soldier may speak again.
Welcome back to the conversation.

"Speak with respect." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'warn') {
            const reason = text || 'No reason given';
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ W A R N I N G  G I V E N ⚡  ║
╚════════════════════════════════════════════╝

⚠️ *Official Warning*

*Reason:* ${reason}
*Enforcement:* Immediate

Heed this warning. Three strikes and you're out.

"Actions have consequences." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'warnings') {
            return reply(`╔════════════════════════════════════════════╗
║          ⚡ W A R N I N G  L O G ⚡    ║
╚════════════════════════════════════════════╝

📋 *Group Warning System*

Track violations and enforce order.
The Garrison keeps records of all transgressions.

Currently monitoring: All members
Active warnings: System armed

*— Never forget, never forgive* 👁️

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'block') {
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ M E M B E R  B L O C K E D ⚡ ║
╚════════════════════════════════════════════╝

🚫 *Communication Severed!*

This soldier has been blocked.
No messages in or out.

"When you're out, you're out." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'unblock') {
            return reply(`╔════════════════════════════════════════════╗
║        ⚡ M E M B E R  U N B L O C K E D ⚡║
╚════════════════════════════════════════════╝

✅ *Communication Restored!*

This soldier is back in the fold.
Redemption is possible, mate.

"Everyone deserves a second chance." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }
    }
};
