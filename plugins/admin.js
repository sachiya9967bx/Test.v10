module.exports = {
    command: ['afk', 'away', 'back', 'settings', 'prefix', 'help'],
    async execute(ctx) {
        const { reply, commandName, text, args } = ctx;

        if (commandName === 'afk' || commandName === 'away') {
            const reason = text || 'AFK';
            return reply(`╔════════════════════════════════════════════╗
║          ⚡ A W A Y  F R O M  K E Y B O A R D ⚡║
╚════════════════════════════════════════════╝

💤 *You are now AFK*

*Reason:* ${reason}

When you return, use ${args[0] || '.'} back

"I'll be back when the time is right." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'back') {
            return reply(`╔════════════════════════════════════════════╗
║      ⚡ W E L C O M E  B A C K ⚡       ║
╚════════════════════════════════════════════╝

⚡ *You are back online!*

The Garrison missed you, mate.
Ready for action again.

"Good to have you back in the game." — Arthur Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'settings') {
            return reply(`╔════════════════════════════════════════════╗
║          ⚡ B O T  S E T T I N G S ⚡   ║
╚════════════════════════════════════════════╝

⚙️ *Available Settings:*

1️⃣ Mode Management
   • .settings mode public/private

2️⃣ Prefix Configuration
   • .settings prefix <char>

3️⃣ Economy Settings
   • Cool down management
   • Earning rates

4️⃣ Group Settings
   • Welcome messages
   • Auto moderation

*Edit config.js for system changes*

"Control everything, miss nothing." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'prefix') {
            return reply(`╔════════════════════════════════════════════╗
║          ⚡ C O M M A N D  P R E F I X ⚡ ║
╚════════════════════════════════════════════╝

📌 *Current Prefix:* .

*To change the prefix:*
1. Edit config.js
2. Change: prefix: '.'
3. Restart the bot

*Common prefixes:*
. (period)
! (exclamation)
~ (tilde)
/ (slash)

"Choose wisely, it defines your order." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'help') {
            return reply(`╔════════════════════════════════════════════╗
║            ⚡ H E L P  C E N T R E ⚡    ║
╚════════════════════════════════════════════╝

🆘 *Need Assistance?*

*Commands:*
• .menu - See all commands
• .help - This message

*Troubleshooting:*
❓ Bot not responding?
   → Check your prefix
   → Ensure bot is in group (group commands)
   → Restart with .restart (boss only)

❓ Economy not working?
   → Use .work to start earning
   → Check .bal for your balance

❓ Group commands failing?
   → Make bot an admin
   → Mention the correct user

*Documentation:*
📖 README.md - Complete guide
⚙️ config.js - Configuration

"When in doubt, ask. Knowledge is power." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }
    }
};
