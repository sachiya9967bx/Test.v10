const config = require('../config');

// Store user menu states
const userMenus = {};

module.exports = {
    command: ['menu', 'help', 'hmenu', 'interactive'],
    async execute(ctx) {
        const { reply, pushName, sender, args, sock, msg } = ctx;

        // Check what menu they want
        const menuType = (args[0] || '').toLowerCase();

        if (!menuType || menuType === 'main') {
            await showMainMenu(reply, pushName, sender);
            userMenus[sender] = 'main';
        } else if (menuType === 'download') {
            await showDownloadMenu(reply);
            userMenus[sender] = 'download';
        } else if (menuType === 'settings') {
            await showSettingsMenu(reply, sender);
            userMenus[sender] = 'settings';
        } else if (menuType === 'fun') {
            await showFunMenu(reply);
            userMenus[sender] = 'fun';
        } else if (menuType === 'admin') {
            await showAdminMenu(reply);
            userMenus[sender] = 'admin';
        } else if (menuType === 'tools') {
            await showToolsMenu(reply);
            userMenus[sender] = 'tools';
        } else {
            await showMainMenu(reply, pushName, sender);
            userMenus[sender] = 'main';
        }

        // Listen for user response (number selection)
        // This is handled by a text handler below
    }
};

// Main Menu
async function showMainMenu(reply, pushName, sender) {
    const menu = `
╔════════════════════════════════════════════╗
║     ⚡ P E A K Y  B L I N D E R S ⚡      ║
║   INTERACTIVE COMMAND MENU SYSTEM          ║
╚════════════════════════════════════════════╝

*👨 Welcome, ${pushName}!*

*Select a menu category by replying with the number:*

  *1* 📥 DOWNLOAD MENU
     - Instagram, TikTok, YouTube, Twitter, Facebook

  *2* ⚙️ SETTINGS MENU
     - Prefix, Auto-features, Bot settings

  *3* 🎮 FUN MENU
     - Games, Gambling, Jokes, Riddles

  *4* 🛠️ TOOLS MENU
     - Stickers, QR codes, Converters, Text tools

  *5* 📱 INFO MENU
     - Weather, Time, User info, Anime search

  *6* 👑 ADMIN MENU
     - Moderation, Group management, Boss commands

  *7* 💰 ECONOMY MENU
     - Work, Balance, Rankings, Leaderboard

  *8* 🎵 MUSIC MENU
     - Songs, Lyrics, YouTube downloads

  *0* 📖 FULL MENU
     - See all available commands

*⟶ Reply with the number to see that menu's commands*

╚════════════════════════════════════════════╝
    `.trim();

    await reply(menu);
}

// Download Menu
async function showDownloadMenu(reply) {
    const menu = `
╔════════════════════════════════════════════╗
║     📥 DOWNLOAD MENU                       ║
╚════════════════════════════════════════════╝

*Available Download Commands:*

  1️⃣  .igdl <url>
      📸 Download Instagram photos/videos

  2️⃣  .tiktok <url>
      🎵 Download TikTok videos

  3️⃣  .ytmp3 <url>
      🎵 YouTube audio to MP3

  4️⃣  .ytmp4 <url>
      📹 YouTube video to MP4

  5️⃣  .twitter <url>
      🐦 Download Twitter/X videos

  6️⃣  .fb <url>
      📱 Download Facebook videos

  7️⃣  .song <name>
      🎵 Search and download music

  8️⃣  .lyrics <song>
      📝 Get song lyrics

*⟶ Type .menu to return to main menu*

╚════════════════════════════════════════════╝
    `.trim();

    await reply(menu);
}

// Settings Menu
async function showSettingsMenu(reply, sender) {
    const menu = `
╔════════════════════════════════════════════╗
║     ⚙️ SETTINGS MENU                       ║
╚════════════════════════════════════════════╝

*Manage Bot Settings:*

  1️⃣  .prefix
      Change command prefix (default: .)

  2️⃣  .anticall on/off
      Enable/disable auto-reject calls

  3️⃣  .autoreact on/off
      Enable/disable auto-message reactions

  4️⃣  .autoreactstat on/off
      Enable/disable auto-status reactions

  5️⃣  .autorecord on/off
      Enable/disable voice recording

  6️⃣  .afk <reason>
      Set away from keyboard message

  7️⃣  .back
      Return from AFK mode

  8️⃣  .settings
      View current bot settings

*Current Status:*
  ⚙️ Anticall: ${config.anticall ? '✅ ON' : '❌ OFF'}
  ⚙️ Auto-React: ${config.autoReact ? '✅ ON' : '❌ OFF'}
  ⚙️ Auto-Recording: ${config.autoRecording ? '✅ ON' : '❌ OFF'}
  ⚙️ Prefix: ${config.prefix}

*⟶ Type .menu to return to main menu*

╚════════════════════════════════════════════╝
    `.trim();

    await reply(menu);
}

// Fun Menu
async function showFunMenu(reply) {
    const menu = `
╔════════════════════════════════════════════╗
║     🎮 FUN MENU                            ║
╚════════════════════════════════════════════╝

*Entertainment & Games:*

  1️⃣  .gamble
      🎲 Gamble your coins

  2️⃣  .flip / .coin
      🪙 Flip a coin - Heads or Tails

  3️⃣  .dice
      🎲 Roll the dice (1-6)

  4️⃣  .rps <choice>
      ✌️ Rock, Paper, Scissors

  5️⃣  .riddle
      🧩 Get a random riddle

  6️⃣  .joke
      😂 Hear a Peaky Blinders joke

  7️⃣  .quote
      💬 Get an authentic quote

  8️⃣  .guess
      🎯 Number guessing game

*⟶ Type .menu to return to main menu*

╚════════════════════════════════════════════╝
    `.trim();

    await reply(menu);
}

// Tools Menu
async function showToolsMenu(reply) {
    const menu = `
╔════════════════════════════════════════════╗
║     🛠️ TOOLS MENU                          ║
╚════════════════════════════════════════════╝

*Utility & Creation Tools:*

  1️⃣  .sticker <text>
      🎨 Create sticker from text

  2️⃣  .attp <text>
      ✨ ATTP style animated sticker

  3️⃣  .qr <text>
      📲 Generate QR code

  4️⃣  .reverse <text>
      🔄 Reverse your text

  5️⃣  .calc <math>
      🧮 Calculator - .calc 5+5

  6️⃣  .convert <value> <unit>
      🌡️ Convert temperature/distance/weight

  7️⃣  .tts <text>
      🔊 Text to speech

  8️⃣  .phonetic <text>
      📡 Military phonetic alphabet

*⟶ Type .menu to return to main menu*

╚════════════════════════════════════════════╝
    `.trim();

    await reply(menu);
}

// Admin Menu
async function showAdminMenu(reply) {
    const menu = `
╔════════════════════════════════════════════╗
║     👑 ADMIN MENU                          ║
╚════════════════════════════════════════════╝

*Moderation & Group Management:*

  1️⃣  .promote @user
      ⬆️ Promote user to admin

  2️⃣  .demote @user
      ⬇️ Demote user from admin

  3️⃣  .kick @user
      🚫 Remove user from group

  4️⃣  .mute @user
      🔇 Mute a member

  5️⃣  .unmute @user
      🔊 Unmute a member

  6️⃣  .warn @user
      ⚠️ Issue a warning

  7️⃣  .hidetag <message>
      📢 Broadcast message to all

  8️⃣  .groupinfo
      📊 Show group statistics

  9️⃣  .owner
      👤 Show group owner info

*Boss Commands (Owner Only):*
  .restart  ⟶ Restart the bot
  .broadcast <msg>  ⟶ Send to all groups

*⟶ Type .menu to return to main menu*

╚════════════════════════════════════════════╝
    `.trim();

    await reply(menu);
}

// Export for use in handler
exports.handler = async (sock, msg, config) => {
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.imageMessage?.caption ||
        msg.message.videoMessage?.caption || '';

    // Check if user selected a menu item
    if (!text.startsWith(config.prefix) && /^[0-8]$/.test(text.trim())) {
        const currentMenu = userMenus[sender] || 'main';
        
        if (currentMenu === 'main') {
            const selection = text.trim();
            
            switch(selection) {
                case '1':
                    await showDownloadMenu((t) => sock.sendMessage(msg.key.remoteJid, { text: t }, { quoted: msg }));
                    break;
                case '2':
                    await showSettingsMenu((t) => sock.sendMessage(msg.key.remoteJid, { text: t }, { quoted: msg }), sender);
                    break;
                case '3':
                    await showFunMenu((t) => sock.sendMessage(msg.key.remoteJid, { text: t }, { quoted: msg }));
                    break;
                case '4':
                    await showToolsMenu((t) => sock.sendMessage(msg.key.remoteJid, { text: t }, { quoted: msg }));
                    break;
                case '5':
                    await sock.sendMessage(msg.key.remoteJid, { text: `📱 Info Menu Coming Soon...` });
                    break;
                case '6':
                    await showAdminMenu((t) => sock.sendMessage(msg.key.remoteJid, { text: t }, { quoted: msg }));
                    break;
                case '7':
                    await sock.sendMessage(msg.key.remoteJid, { text: `💰 Economy Menu - Type .rank, .stats, .leaderboard, .work` });
                    break;
                case '8':
                    await sock.sendMessage(msg.key.remoteJid, { text: `🎵 Music Menu - Type .song, .lyrics, .ytmp3, .ytmp4` });
                    break;
                case '0':
                    await sock.sendMessage(msg.key.remoteJid, { text: `📖 Full menu - Type .menu` });
                    break;
            }
        }
    }
};
