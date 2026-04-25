const config = require('../config');

module.exports = {
  command: ['menu', 'help', 'list', 'panel'],
  async execute(ctx) {
    const { reply, pushName, isOwner, sock, msg } = ctx;

    let date = new Date().toLocaleDateString("EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let time = new Date().toLocaleTimeString("EN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const menuText = `
╔═════════════════════
║     ⚡ P E A K Y  B L I N D E R S ⚡   
║   — The Sharpest Blades in Birmingham —  
╚═════════════════════

*👨 Gentleman:* ${pushName}
*👑 Boss:* ${config.ownerName}
*📅 Date:* ${date}
*⌚ Time:* ${time}
*🏘️ Territory:* ${config.location}
*⚔️ Prefix:* ${config.prefix}
*🎯 Mode:* ${config.workType.toUpperCase()}

╔═════════════════════

*Please reply with a number to view commands:*
*( This menu expires in 60 seconds )*

  *[ 1 ]* ⟶ 📥 Downloads Menu
  *[ 2 ]* ⟶ ⚙️ Settings Menu
  *[ 3 ]* ⟶ 🎮 Fun Menu
  *[ 4 ]* ⟶ 🛠️ Tools Menu
  *[ 5 ]* ⟶ 📱 Info Menu
  *[ 6 ]* ⟶ 👑 Admin Menu
  *[ 7 ]* ⟶ 💰 Economy Menu
  *[ 8 ]* ⟶ 🎵 Music Menu

╔══════════════════════

⚔️ *By Order of the Peaky Blinders* ⚔️
🔥 Version ${config.botVersion} | © ${new Date().getFullYear()}

*"Small health and mental strength. That's what the Sober and Industrious require."*
        `.trim();

    await sock.sendMessage(msg.key.remoteJid, {
      image: { url: config.thomasImages.menu },
      caption: menuText,
    }, { quoted: msg });
  }
};
