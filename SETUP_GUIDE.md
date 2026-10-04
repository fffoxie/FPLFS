# FPLFS Setup Guide - For FFFoxie

## Overview
This guide walks through setting up the Frever Private Local Server (FPLFS) from scratch. All tools are free and school-browser friendly.

## Prerequisites
- Computer with internet access (school computer works)
- Phone with Frever APK installed
- WiFi network (same network for both devices)
- GitHub account (school account)
- VS Code Web account (GitHub login)

## Step 1: Repository Setup

### 1.1 Fork the repository
1. Go to https://github.com/fffoxie/FPLFS
2. Click "Fork" button
3. Your fork will be at: https://github.com/YOUR_USERNAME/FPLFS

### 1.2 Open in VS Code Web
1. Go to https://vscode.dev/
2. Click "Open Repository"
3. Enter: YOUR_USERNAME/FPLFS
4. Sign in with GitHub
5. Wait for repository to load

## Step 2: Install Dependencies

### 2.1 Open Terminal
1. In VS Code: Terminal → New Terminal
2. Run: `npm install`
3. Wait for installation (can take 2-5 minutes)

### 2.2 Create data directory
```bash
mkdir data
```

## Step 3: Configure Environment

### 3.1 Create .env file
Create a file named `.env` in the root with:
```
JWT_SECRET=your-super-secret-key-here
VIDEO_BASE_URL=https://example.com/videos
AVATAR_BASE_URL=https://example.com/avatars
PORT=3000
```

### 3.2 Get your computer's IP address
- **Windows**: Open Command Prompt → `ipconfig` → Look for IPv4 Address under WiFi adapter
- **Mac**: System Settings → Network → Wi-Fi → IP address
- **Linux**: Terminal → `hostname -I`

Example IP: `192.168.1.45`

## Step 4: Start the Server

### 4.1 Start the server
In VS Code terminal:
```bash
npm start
```

Server should output:
```
FPLFS server running on port 3000
```

### 4.2 Keep terminal open
Leave VS Code running. The server needs to stay active.

## Step 5: Patch the APK

### 5.1 Download APK patcher
1. Download: https://gofile.io/d/yvEYLNE4 (Frever-FPS.apk)

### 5.2 If you need to patch your own APK
Use Python script `patcher.py`:
```bash
python3 patcher.py original.apk YOUR_IP:3000
```

## Step 6: Connect Phone

### 6.1 Install APK on phone
1. Uninstall original Frever app
2. Enable unknown apps: Settings → Apps → Special Access → Install unknown apps
3. Open downloaded APK → Install

### 6.2 Launch Frever
1. Open Frever app
2. Login/register as normal
3. Videos should load from your local server

## Troubleshooting

### Server won't start
- Check port 3000 isn't blocked
- Verify node version: `node --version` (should be 18+)
- Delete node_modules and retry: `rm -rf node_modules && npm install`

### Phone can't connect
- Verify both devices on same WiFi
- Check computer firewall allows port 3000
- Try different port: change `PORT=3000` to `PORT=4000` in .env

### Permission errors
- Run VS Code as administrator (Windows)
- Or use different port that doesn't require admin

## Cloud Deployment Alternative (Railway)

If local WiFi doesn't work:

1. Go to https://railway.app
2. Sign in with GitHub
3. New Project → Deploy from GitHub
4. Select YOUR_USERNAME/FPLFS
5. Click "Deploy"
6. Wait for deployment (2-3 minutes)
7. Copy the Railway URL
8. Patch APK to use that URL instead of IP

## File Structure

```
FPLFS/
├── package.json          # Dependencies and scripts
├── README.md             # Documentation
├── .gitignore            # Git ignore rules
├── .env                  # Environment variables (create this)
├── data/                 # Database files (create this)
├── src/
│   ├── index.js          # Main server entry
│   ├── bridge.js         # Protobuf router
│   ├── database.js       # SQLite setup
│   └── routes/
│       ├── auth.js       # Login/register
│       ├── profile.js    # User profile
│       ├── video.js      # Video feed
│       ├── social.js     # Likes/follows
│       ├── crew.js       # Crews
│       ├── chat.js       # Chat
│       ├── wardrobe.js   # Characters
│       ├── task.js       # Tasks
│       ├── asset.js      # Assets
│       └── misc.js       # Misc endpoints
└── proto/
    └── bridge.proto      # Protobuf definitions
```

## Next Steps

1. Test all endpoints at http://YOUR_IP:3000/health
2. Add video upload functionality
3. Implement real video storage
4. Add user profiles and avatars

---
**Created by FFFoxie • MIT License**