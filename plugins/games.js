const config = require('../config');

module.exports = {
    command: ['gamble', 'redrighthand', 'bet'],
    async execute(ctx) {
        const { reply, args } = ctx;

        const outcome = Math.random() > 0.5;
        const choices = ['heads', 'tails', 'win', 'lose'];
        const userChoice = args[0] ? args[0].toLowerCase() : 'win';

        await reply(`╔════════════════════════════════════════════╗
║      ⚡ T H E  G A M E  B E G I N S ⚡    ║
╚════════════════════════════════════════════╝

🎲 Tossing the coin...
⏳ The fate of Birmingham awaits...

*By order of the Peaky Blinders...*`);

        setTimeout(async () => {
            if (outcome) {
                await reply(`╔════════════════════════════════════════════╗
║          ⚡ Y O U  W I N ! ⚡             ║
╚════════════════════════════════════════════╝

💰 *VICTORY IS YOURS!* 💰

*"Fortune favors the bold, and the bold are those who follow the Shelbys."*

🍀 Luck is on your side today, mate!
🎯 The odds were against you, but you prevailed.
⚡ The Garrison smiles upon you.

*The Peaky Blinders acknowledge your success.* 👑

╔════════════════════════════════════════════╗`);
            } else {
                await reply(`╔════════════════════════════════════════════╗
║          ⚡ Y O U  L O S E ! ⚡           ║
╚════════════════════════════════════════════╝

💀 *DEFEAT IS HERE* 💀

*"In the end, we all get what we deserve."*

🚬 The house always wins, and today, you ain't the house.
🎰 Better luck next time, friend.
⚠️ The odds have spoken their verdict.

*Try again when fortune smiles.* 🎯

╔════════════════════════════════════════════╗`);
            }
        }, 2000);
    }
};
