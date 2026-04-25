const os = require('os');
const config = require('../config');

module.exports = {
    command: ['system', 'status', 'botinfo'],
    async execute(ctx) {
        const { reply } = ctx;

        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

        const systemInfo = `
╔════════════════════════════════════════════╗
║     ⚡ P E A K Y  S Y S T E M  I N F O ⚡  ║
╚════════════════════════════════════════════╝

*👑 Garrison Status Report*

  ⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
  🧠 *Memory Usage:* ${ram}MB / ${totalRam}GB
  💻 *System:* ${os.platform()} (${os.arch()})
  👁️ *Platform:* ${os.platform().toUpperCase()}
  
*🏢 Gang Information*
  
  ⚔️ *Boss:* ${config.ownerName}
  🏘️ *Territory:* ${config.location}
  🎯 *Gang Name:* ${config.botName}
  📊 *Version:* ${config.botVersion}
  🔥 *Status:* RUNNING

*📈 Performance Metrics*

  ✅ All Systems Operational
  🚀 Ready for Action
  💪 Strength: Maximum
  🛡️ Defense: Active

╔════════════════════════════════════════════╗
*⚡ By Order of the Peaky Blinders ⚡*

*"The business is family. Everything else is just noise."* — Tommy Shelby
        `.trim();

        await reply(systemInfo);
    }
};
