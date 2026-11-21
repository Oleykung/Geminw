// PM2 config for 24h online on VPS
// รันด้วย: pm2 start ecosystem.config.js --env production
// ดูสถานะ: pm2 status
// รีสตาร์ท: pm2 restart granado-boss-bot
// ล็อก: pm2 logs granado-boss-bot

module.exports = {
  apps: [{
    name: "granado-boss-bot",
    script: "./bot.py",
    interpreter: "python3",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "300M",
    env: {
      PYTHONUNBUFFERED: "1",
      PORT: "10000"
    },
    env_production: {
      PYTHONUNBUFFERED: "1",
      PORT: "10000",
      NODE_ENV: "production"
    },
    error_file: "./logs/err.log",
    out_file: "./logs/out.log",
    log_file: "./logs/combined.log",
    time: true
  }]
};
