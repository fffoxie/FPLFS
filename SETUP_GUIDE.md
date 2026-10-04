# FPLFS Setup Guide — Cloud Deployment via Render

## Overview
Set up the Frever Private Local Server (FPLFS) entirely in the cloud using Render. $0 budget, school-browser friendly.

## Prerequisites
- GitHub account (school account)
- Render account (free tier at https://render.com)
- Phone with Frever APK installed
- Same WiFi network as your phone (or Render's public URL)

## Step 1: Fork the Repository

1. Go to https://github.com/fffoxie/FPLFS
2. Click **Fork**
3. Your fork: https://github.com/YOUR_USERNAME/FPLFS

## Step 2: Deploy on Render

### 2.1 Sign up for Render
1. Go to https://render.com
2. Sign up (free tier)
3. Connect your GitHub account

### 2.2 Create a new Web Service
1. In Render dashboard, click **New** → **Web Service**
2. Connect your GitHub account
3. Select your forked repo: `YOUR_USERNAME/FPLFS`
4. Render will auto-detect it as a Node.js app

### 2.3 Configure the service
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free (`free`)
- **Environment Variables** (add these in the Render dashboard):

| Key | Value |
|-----|-------|
| `JWT_SECRET` | `your-super-secret-key-here` |
| `PORT` | `3000` |
| `VIDEO_BASE_URL` | `https://example.com/videos` |
| `AVATAR_BASE_URL` | `https://example.com/avatars` |

### 2.4 Deploy
1. Click **Create Web Service**
2. Wait for deployment (2-3 minutes)
3. Copy the Render URL (format: `https://your-app.onrender.com`)

### 2.5 Verify deployment
- Visit `https://your-app.onrender.com/health` — should return `{"status": "ok"}`
- Visit `https://your-app.onrender.com/api/client/urls` — should return video/avatar URLs

## Step 3: Patch the APK

### 3.1 Download the pre-patched APK
- https://gofile.io/d/yvEYLNE4

### 3.2 Or patch your own APK for Render
```bash
python3 patcher.py original.apk https://your-app.onrender.com
```

## Step 4: Connect Phone

1. **Uninstall** original Frever app
2. Enable unknown apps: **Settings → Apps → Special Access → Install unknown apps**
3. Open downloaded APK → **Install**
4. Open Frever → login/register
5. Videos should load from your Render server

## Step 5: Verify Everything Works

- Health check: `curl https://your-app.onrender.com/health`
- Client URLs: `curl https://your-app.onrender.com/api/client/urls`
- Supported versions: `curl https://your-app.onrender.com/api/Client/SupportedVersions`

## Troubleshooting

### Server won't start on Render
- Check build logs in Render dashboard
- Verify `start` script in `package.json`
- Check `node --version` compatibility (needs 18+)

### Phone can't connect to Render URL
- Make sure both devices are on the same network (or Render's public URL handles it)
- Try a different port in `.env` (e.g., `PORT=4000`)
- Check Render's firewall/port settings

### Free tier limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds to wake up
- This is normal — just wait and retry

### Permission errors on Render
- Render handles port binding automatically
- Use `process.env.PORT` (already configured in `src/index.js`)

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
# Clone and setup locally
git clone https://github.com/YOUR_USERNAME/FPLFS.git
cd FPLFS
npm install
mkdir data

# Start server locally
npm start

# Patch APK for Render URL
python3 patcher.py Frever.apk https://your-app.onrender.com
```

## Render vs Local WiFi

| | Local WiFi | Render |
|---|----------|--------|
| Cost | $0 | $0 (free tier) |
| Requires same network | Yes | No |
| Phone on cellular data | No | Yes |
| Setup complexity | Low | Medium |
| Speed | Fast (LAN) | Depends on internet |
| Spin-down | N/A | After 15 min idle |

---
**Created by FFFoxie • MIT License**