module.exports = {
    command: ['welcome', 'groupinfo', 'groupstats', 'groupdesc', 'owner'],
    async execute(ctx) {
        const { sock, msg, text, reply, commandName, isOwner } = ctx;
        const jid = msg.key.remoteJid;

        if (!jid.endsWith('@g.us')) {
            return reply('*⚠️ This is for groups only, mate!*');
        }

        try {
            const groupMetadata = await sock.groupMetadata(jid);
            const participants = groupMetadata.participants;
            const adminCount = participants.filter(p => p.admin).length;

            if (commandName === 'welcome') {
                const welcomeMsg = `╔════════════════════════════════════════════╗
║  🎩 W E L C O M E  T O  T H E  G A N G 👑 ║
╚════════════════════════════════════════════╝

📍 *Group:* ${groupMetadata.subject}
👥 *Members:* ${participants.length}
🔑 *Admins:* ${adminCount}

You have accepted the Peaky Blinders code.

*House Rules:*
1️⃣ Respect the hierarchy
2️⃣ Follow the boss's orders
3️⃣ Keep the business silent
4️⃣ Never betray the gang
5️⃣ What happens in Birmingham stays in Birmingham

"By order of the Peaky Blinders!" ⚔️

Welcome, soldier. You are now part of something bigger.

╔════════════════════════════════════════════╗`;

                await reply(welcomeMsg);
            }

            if (commandName === 'groupinfo' || commandName === 'groupstats') {
                const groupInfo = `╔════════════════════════════════════════════╗
║        ⚡ G R O U P  I N F O R M A T I O N ⚡║
╚════════════════════════════════════════════╝

📍 *Name:* ${groupMetadata.subject}
🆔 *ID:* ${groupMetadata.id}
👥 *Total Members:* ${participants.length}
👮 *Admins:* ${adminCount}
📍 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}

*Members Breakdown:*
🔑 Admins: ${adminCount}
👤 Members: ${participants.length - adminCount}

"Know your gang, know your strength." — Tommy Shelby

╔════════════════════════════════════════════╗`;

                await reply(groupInfo);
            }

            if (commandName === 'owner') {
                const ownerJid = groupMetadata.owner;
                const ownerName = participants.find(p => p.id === ownerJid)?.pushName || 'Unknown';

                return reply(`╔════════════════════════════════════════════╗
║          ⚡ G R O U P  O W N E R ⚡     ║
╚════════════════════════════════════════════╝

👑 *Boss of This Territory:*
📛 *Name:* ${ownerName}
🆔 *Number:* ${ownerJid.split('@')[0]}

*The authority is absolute.*

"Respect the chain of command." — Tommy Shelby

╔════════════════════════════════════════════╗`);
            }

            if (commandName === 'groupdesc') {
                if (!isOwner) {
                    return reply('*⚠️ Only the boss can describe the gang!*');
                }

                const desc = groupMetadata.desc || 'No description set';
                return reply(`╔════════════════════════════════════════════╗
║        ⚡ G R O U P  D E S C R I P T I O N ⚡║
╚════════════════════════════════════════════╝

📝 ${desc}

*Set the narrative of your gang.*

╔════════════════════════════════════════════╗`);
            }
        } catch (err) {
            await reply('*⚠️ Failed to fetch group information!*');
        }
    }
};
