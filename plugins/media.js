const axios = require('axios');

module.exports = {
    command: ['nobg', 'qr', 'qrcode', 'removebg', 'enhance'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (commandName === 'qr' || commandName === 'qrcode') {
            if (!text) {
                return reply('*⚠️ What should the QR code contain, mate?*');
            }

            try {
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
                
                return reply(`╔════════════════════════════════════════════╗
║           ⚡ Q R  C O D E ⚡           ║
╚════════════════════════════════════════════╝

🔲 *Code Generated!*

Content: ${text}
Format: QR Code
Quality: 500x500

*Scan it like you scan for threats, mate* 👁️

Link: ${qrUrl}

╔════════════════════════════════════════════╗`);
            } catch (err) {
                return reply('*⚠️ Failed to forge the code!*');
            }
        }

        if (commandName === 'removebg' || commandName === 'nobg') {
            return reply(`╔════════════════════════════════════════════╗
║        ⚡ B A C K G R O U N D ⚡        ║
║          R E M O V A L               ║
╚════════════════════════════════════════════╝

🎨 *Background Remover*

Send an image you want processed.
The Garrison can erase what needs erasing.

*Note: Reply to an image with this command*

"What's past is past. Erase it." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'enhance') {
            return reply(`╔════════════════════════════════════════════╗
║        ⚡ I M A G E  E N H A N C E ⚡   ║
╚════════════════════════════════════════════╝

🖼️ *Image Enhancement*

Reply to an image to enhance it.
Sharpen the details, brighten the future.

*Available enhancements:*
• Sharpen
• Brightness
• Contrast
• Saturation

"See the details others miss." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }
    }
};
