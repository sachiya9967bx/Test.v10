const config = require('../config');

module.exports = {
    command: ['ping'],
    async execute(ctx) {
        const { reply } = ctx;
        const start = Date.now();
        const initialMsg = await reply(`⚔️ *THE BLADE STRIKES!*\n\n🔥 Measuring the speed of vengeance...`);
        const end = Date.now();
        
        setTimeout(async () => {
            await reply(`
╔════════════════════════════════════════════╗
║          ⚡ P I N G  R E S U L T S ⚡      ║
╚════════════════════════════════════════════╝

⚡ *Lightning Speed:* ${end - start}ms
🏃 *Response Time:* ${end - start}ms
🎯 *Status:* ✅ CONNECTED

*"The speed of execution determines the empire. By order of the Peaky Blinders."* 

— Thomas Shelby

╔════════════════════════════════════════════╗
            `.trim());
        }, 500);
    }
};
