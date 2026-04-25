const config = require('../config');

module.exports = {
    command: ['restart', 'broadcast', 'bc'],
    async execute(ctx) {
        const { sock, text, reply, isOwner } = ctx;

        if (!isOwner) return reply('*⚠️ Step back! This is for the Boss only! 👑*');

        const cmd = ctx.commandName || (ctx.args && ctx.args[0]); // Fallback if commandName is missing

        if (cmd === 'restart') {
            await reply(`╔════════════════════════════════════════════╗
║       ⚡ R E S T A R T I N G ⚡         ║
╚════════════════════════════════════════════╝

⚔️ Closing the shop for maintenance...
🔄 The blades will be sharpened shortly!
🛠️ Our machinery needs tuning...

*Stand by, gentlemen. The Garrison will reopen shortly.* 

— By order of Tommy Shelby
╔════════════════════════════════════════════╗`);
            setTimeout(() => {
                process.exit(0); // Assuming a process manager like PM2 or the index.js loop will restart it
            }, 1000);
        } else {
            // Broadcast
            if (!text) return reply('*⚠️ Send word! What is the message?*');

            const groups = Object.keys(await sock.groupFetchAllParticipating());
            await reply(`╔════════════════════════════════════════════╗
║       ⚡ B R O A D C A S T I N G ⚡     ║
╚════════════════════════════════════════════╝

📢 Sending word to ${groups.length} territories...
🏘️ The message spreads across Birmingham...

*Patience, boss. Word will reach everywhere.* 🔥`);

            for (let jid of groups) {
                await sock.sendMessage(jid, {
                    text: `╔════════════════════════════════════════════╗
║   📢 B R O A D C A S T  F R O M  B O S S 👑  ║
╚════════════════════════════════════════════╝

${text}

*— By Order of the Peaky Blinders ⚡*
*— From the Garrison, Birmingham*

*Heed this message well.*`
                });
            }
            await reply(`╔════════════════════════════════════════════╗
║        ✅ B R O A D C A S T  S E N T ✅   ║
╚════════════════════════════════════════════╝

Word has been sent to all ${groups.length} territories!
The whole city hears the Shelby name echo.

*The Garrison has spoken.* 👑 ⚡`);
        }
    }
};
