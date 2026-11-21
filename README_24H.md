# Granado Espada M - บอทออนไลน์ 24 ชม. วิธีทำ

## ไฟล์ที่เพิ่มมาสำหรับ 24 ชม.
- Dockerfile - สำหรับ Render/Railway/Fly.io
- railway.json - สำหรับ Railway.app
- Procfile - สำหรับ Heroku/Railway
- ecosystem.config.js - สำหรับ PM2 บน VPS
- bot.service - สำหรับ systemd บน VPS
- keep_alive.sh - สคริปต์รีสตาร์ทอัตโนมัติ

## วิธีที่ 1: Render.com (ฟรี แต่ต้องมี UptimeRobot)

1. อัพโหลดไฟล์ชุดนี้ไป Render
2. Settings:
   - Build Command: pip install -r requirements.txt
   - Start Command: python bot.py  (สำคัญ! ต้องเป็น python bot.py ไม่ใช่ gunicorn)
3. ใส่ ENV:
   - DISCORD_TOKEN = โทเค็นบอท
   - ALERT_CHANNEL_ID = ID ห้องแจ้งเตือน
   - PORT = 10000 (Render ใส่ให้อัตโนมัติ)
4. Deploy
5. เอา URL ที่ Render ให้ เช่น https://your-app.onrender.com
   ไปใส่ใน UptimeRobot.com ให้ ping ทุก 5 นาที เพื่อไม่ให้ Render Sleep

API Health Check: https://your-app.onrender.com/api/status

## วิธีที่ 2: Railway.app (แนะนำ ฟรี ดีกว่า Render)

1. ไป railway.app -> New Project -> Deploy from GitHub
2. อัพโหลดไฟล์ชุดนี้
3. ใส่ Variables:
   - DISCORD_TOKEN
   - ALERT_CHANNEL_ID
   - PORT=10000
4. Deploy อัตโนมัติ บอทออนไลน์ 24 ชม. ไม่ Sleep

## วิธีที่ 3: VPS Ubuntu (ดีที่สุด 24 ชม.แท้)

```bash
# 1. อัพโหลดไฟล์ไป VPS
scp -r GranadoEspadaM_BossBot_24h_Online root@YOUR_VPS_IP:/root/

# 2. SSH เข้า VPS
ssh root@YOUR_VPS_IP

# 3. ติดตั้ง
cd /root/GranadoEspadaM_BossBot_24h_Online
pip3 install -r requirements.txt

# 4. ใส่ TOKEN ใน .env
nano .env
# ใส่:
# DISCORD_TOKEN=xxx
# ALERT_CHANNEL_ID=xxx

# 5. รันแบบ PM2 (แนะนำ)
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# หรือรันแบบ systemd
sudo cp bot.service /etc/systemd/system/granado-boss-bot.service
sudo systemctl daemon-reload
sudo systemctl enable granado-boss-bot
sudo systemctl start granado-boss-bot

# หรือรันแบบง่าย nohup
nohup python3 bot.py > bot.log 2>&1 &
```

## วิธีที่ 4: Replit.com (ง่ายสุด)

1. สร้าง Repl Python
2. อัพโหลดไฟล์ทั้งหมด
3. ใส่ Secrets: DISCORD_TOKEN, ALERT_CHANNEL_ID
4. กด Run
5. เปิด UptimeRobot ping URL ของ Replit

## เช็คว่าบอทออนไลน์ 24 ชม. หรือยัง

- ใน Discord พิมพ์ /bosslist ดูว่าบอทตอบไหม
- เปิด https://your-app-url/api/status ดูสถานะ
- ดู Log ใน Render/Railway/VPS

## คำสั่งบอท

/bosslist - ดูบอสทั้งหมด 19 ตัว
/bossnext - ดูเวลาบอสเกิดถัดไป
/bosskill - เลือกบอสที่ฆ่าได้ (มี dropdown ไม่ต้องพิมพ์)
/bossreset - รีเซ็ตเวลา (มี dropdown รวม Reset All)
/setalert - ตั้งห้องแจ้งเตือน
/boss - ดูบอสแบบละเอียด

บอทจะแจ้งเตือนก่อนบอสเกิด 10 นาที @everyone อัตโนมัติ
