#!/bin/bash
# Keep alive script for VPS - auto restart if bot crashes
# รันด้วย: nohup ./keep_alive.sh > keep_alive.log 2>&1 &

while true
do
  echo "[$(date)] Starting bot.py..."
  python3 bot.py
  echo "[$(date)] Bot crashed! Restarting in 5 seconds..."
  sleep 5
done
