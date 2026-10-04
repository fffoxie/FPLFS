# FPLFS Setup Guide — Cloud Deployment via Rainway

## Overview
Set up the Frever Private Local Server (FPLFS) entirely in the cloud using Rainway. $0 budget, school-browser friendly.

## Prerequisites
- Rainway account (free at https://rainway.com)
- Phone with Frever APK installed
- Same WiFi network as your Rainway-hosted server (or Rainway's public tunnel)

## Step 1: Fork the Repository

1. Go to https://github.com/fffoxie/FPLFS
2. Click **Fork**
3. Your fork: https://github.com/YOUR_USERNAME/FPLFS

## Step 2: Deploy on Rainway

### 2.1 Sign up for Rainway
1. Go to https://rainway.com
2. Sign up (free tier)
3. Download the Rainway app to your computer
4. Install and sign in

### 2.2 Open your repo in Rainway's cloud computer
1. In Rainway, open **Files** or connect to your cloud computer
2. Clone your forked repo:
```bash
git clone https://github.com/YOUR_USERNAME/FPLFS.git
cd FPLFS
```

### 2.3 Install dependencies
```bash
npm install
mkdir data
```

### 2.4 Create .env file
```bash
cat > .env << 'EOF'
JWT_SECRET=your-super-secret-key-here
VIDEO_BASE_URL=https://example.com/videos
AVATAR_BASE_URL=https://example.com/avatars
PORT=3000
EOF
```

### 2.5 Start the server
```bash
npm start
```

Rainway exposes port 3000 through its tunnel. Copy the Rainway URL (format: `https://[id].play.rainway.com`).

### 2.6 Keep the server running
Leave the terminal open. Rainway keeps the session alive while connected.

## Step 3: Patch the APK

### 3.1 Download the pre-patched APK
- https://gofile.io/d/yvEYLNE4

### 3.2 Or patch your own APK for Rainway
```bash
python3 patcher.py original.apk https://YOUR_ID.play.rainway.com
```

## Step 4: Connect Phone

1. **Uninstall** original Frever app
2. Enable unknown apps: **Settings → Apps → Special Access → Install unknown apps**
3. Open downloaded APK → **Install**
4. Open Frever → login/register
5. Videos should load from your cloud server

## Step 5: Verify Everything Works

- Health check: `curl https://YOUR_ID.play.rainway.com/health`
- Client URLs: `curl https://YOUR_ID.play.rainway.com/api/client/urls`
- Supported versions: `curl https://YOUR_ID.play.rainway.com/api/Client/SupportedVersions`

## Troubleshooting

### Server won't start on Rainway
- Check Node version: `node --version` (needs 18+)
- Delete node_modules and retry: `rm -rf node_modules && npm install`
- Check port isn't blocked: `netstat -tlnp | grep 3000`

### Phone can't connect to Rainway URL
- Make sure both devices are on the same network (or Rainway tunnel handles it)
- Try a different port in `.env` (e.g., `PORT=4000`)
- Check Rainway's firewall/port settings

### Permission errors on Rainway
- Rainway cloud computer may have restricted permissions
- Try a port above 1024 (e.g., 3000, 4000, 8080)
- Run `npm start` without sudo

## File Structure

```
FPLFS/
├── README.md
├── SETUP_GUIDE.md
├── package.json
├── .gitignore
├── patcher.py
├── proto/
│   └── bridge.proto
└── src/
    ├── index.js
    ├── database.js
    ├── bridge.js
    └── routes/
        ├── auth.js
        ├── profile.js
        ├── video.js
        ├── social.js
        ├── crew.js
        ├── chat.js
        ├── wardrobe.js
        ├── task.js
        ├── asset.js
        └── misc.js
```

## Quick Reference

```bash
# Clone and setup
git clone https://github.com/YOUR_USERNAME/FPLFS.git
cd FPLFS
npm install
mkdir data

# Start server
npm start

# Patch APK for Rainway URL
python3 patcher.py Frever.apk https://YOUR_ID.play.rainway.com
```

---
**Created by FFFoxie • MIT License**