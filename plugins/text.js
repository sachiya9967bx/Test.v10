module.exports = {
    command: ['reverse', 'tts', 'phonetic'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (!text) {
            return reply('*⚠️ Say something, mate!*');
        }

        if (commandName === 'reverse') {
            const reversed = text.split('').reverse().join('');
            return reply(`╔════════════════════════════════════════════╗
║           ⚡ R E V E R S E D ⚡          ║
╚════════════════════════════════════════════╝

*Original:* ${text}

*Reversed:* ${reversed}

*— The mirror never lies, mate* 🪞

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'tts') {
            return reply(`*📢 Text to Speech*

Your message would be spoken:
"${text}"

*Use your device's native TTS for voice conversion.*`);
        }

        if (commandName === 'phonetic') {
            const phonetic = text.split('').map(c => {
                const phonetics = {
                    'a': 'Alpha', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta',
                    'e': 'Echo', 'f': 'Foxtrot', 'g': 'Golf', 'h': 'Hotel',
                    'i': 'India', 'j': 'Juliett', 'k': 'Kilo', 'l': 'Lima',
                    'm': 'Mike', 'n': 'November', 'o': 'Oscar', 'p': 'Papa',
                    'q': 'Quebec', 'r': 'Romeo', 's': 'Sierra', 't': 'Tango',
                    'u': 'Uniform', 'v': 'Victor', 'w': 'Whiskey', 'x': 'X-ray',
                    'y': 'Yankee', 'z': 'Zulu'
                };
                return phonetics[c.toLowerCase()] || c;
            }).join(' - ');

            return reply(`╔════════════════════════════════════════════╗
║         ⚡ P H O N E T I C ⚡           ║
╚════════════════════════════════════════════╝

*Message:* ${text}

*Military Phonetic:*
${phonetic}

*— The Shelby Code, decoded* 🔐

╔════════════════════════════════════════════╗`);
        }
    }
};
