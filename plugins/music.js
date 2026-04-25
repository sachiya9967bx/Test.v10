module.exports = {
    command: ['song', 'play', 'lyrics', 'music', 'ytmp3', 'ytmp4', 'video'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (commandName === 'song' || commandName === 'play') {
            if (!text) {
                return reply('*⚠️ Which song, mate?*\n\nExample: .song Red Right Hand');
            }

            return reply(`╔════════════════════════════════════════════╗
║         ⚡ M U S I C  S E A R C H ⚡     ║
╚════════════════════════════════════════════╝

🎵 *Searching for:* ${text}

🎧 YouTube: https://www.youtube.com/results?search_query=${encodeURIComponent(text)}
🎶 Spotify: https://open.spotify.com/search/${encodeURIComponent(text)}

*"The right music sets the tone for war."* — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'lyrics') {
            if (!text) {
                return reply('*⚠️ Song name required, mate!*\n\nExample: .lyrics Red Right Hand');
            }

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ S O N G  L Y R I C S ⚡    ║
╚════════════════════════════════════════════╝

📝 *Song:* ${text}

Get lyrics at: https://www.google.com/search?q=${encodeURIComponent(text + ' lyrics')}

*"Words carry power, even in songs."* 🎤

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'ytmp3') {
            if (!text) {
                return reply('*⚠️ YouTube URL required!*\n\nExample: .ytmp3 <url>');
            }

            return reply(`╔════════════════════════════════════════════╗
║        ⚡ A U D I O  D O W N L O A D ⚡  ║
╚════════════════════════════════════════════╝

🎵 *Converting to MP3...*

*Link:* ${text}

Use online converters:
• https://ytmp3.cc
• https://y2mate.com

*"Extract the essence, leave the rest."* 🎧

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'ytmp4' || commandName === 'video') {
            if (!text) {
                return reply('*⚠️ YouTube URL required!*\n\nExample: .ytmp4 <url>');
            }

            return reply(`╔════════════════════════════════════════════╗
║        ⚡ V I D E O  D O W N L O A D ⚡  ║
╚════════════════════════════════════════════╝

📹 *Converting to MP4...*

*Link:* ${text}

Use online converters:
• https://y2mate.com
• https://ssyoutube.com

*"Capture the moment, preserve the memory."* 🎬

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'music') {
            return reply(`╔════════════════════════════════════════════╗
║        ⚡ M U S I C  C O M M A N D S ⚡  ║
╚════════════════════════════════════════════╝

🎵 *Available Music Commands:*

.song <name>    - Search for a song
.play <name>    - Same as .song
.lyrics <song>  - Get song lyrics
.ytmp3 <url>    - Download audio
.ytmp4 <url>    - Download video

*"Music is the soundtrack of power."* 🎧

╔════════════════════════════════════════════╗`);
        }
    }
};
