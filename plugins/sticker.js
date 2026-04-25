const axios = require('axios');

module.exports = {
    command: ['sticker', 'stik', 'attp', 'quote'],
    async execute(ctx) {
        const { sock, msg, text, reply, commandName } = ctx;

        if (!text && commandName !== 'sticker') {
            return reply('*⚠️ Send text for the sticker, mate!*');
        }

        if (commandName === 'attp' || commandName === 'quote') {
            try {
                const message = text || 'PEAKY BLINDERS';
                const stickerUrl = `https://api.memegen.link/images/custom/${encodeURIComponent(message)}.png`;
                
                const imageRes = await axios.get(stickerUrl, { responseType: 'arraybuffer' });
                
                await sock.sendMessage(msg.key.remoteJid, {
                    sticker: imageRes.data
                }, { quoted: msg });

                await reply('*✅ Sticker razor sharp!*');
            } catch (err) {
                await reply('*⚠️ Failed to sharpen the blade!*');
            }
        } else if (commandName === 'sticker' || commandName === 'stik') {
            try {
                const message = text || 'PEAKY BLINDERS';
                const stickerUrl = `https://api.memegen.link/images/custom/${encodeURIComponent(message)}.png`;
                
                const imageRes = await axios.get(stickerUrl, { responseType: 'arraybuffer' });
                
                await sock.sendMessage(msg.key.remoteJid, {
                    sticker: imageRes.data
                }, { quoted: msg });

                await reply('*✅ The blade has been forged!*');
            } catch (err) {
                await reply('*⚠️ Couldn\'t forge the blade, mate!*');
            }
        }
    }
};
