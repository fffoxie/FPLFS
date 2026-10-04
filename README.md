# Frever Private Local Server (FPLFS)

**A complete replacement server for the Frever social video app - $0 budget, school browser friendly.**

## Quick Start (School Browser)

### Option A: Local WiFi (Phone + Computer)

1. **Download server files:**
   - ZIP: https://files.shapes.inc/api/files/workshop--dot-dasv--20261004-133119-ylmcej-FPLFS-Frever-Server.zip
   - Extract to folder

2. **Open in VS Code Web:**
   - Go to https://vscode.dev/
   - Click "Open Folder"

3. **Start server:**
   ```bash
   npm install
   npm start
   ```
   Server runs on http://localhost:3000

4. **Find your computer's IP:**
   - Windows: Open Command Prompt → type `ipconfig`

5. **Download patched APK:**
   - https://gofile.io/d/yvEYLNE4 (217MB)

6. **Install on phone:**
   - Uninstall original Frever app
   - Settings → Apps → Special Access → Install unknown apps
   - Open downloaded APK → Install

### Option B: Cloud Deployment (Railway)

1. Go to https://railway.app
2. Sign in with GitHub
3. New Project → Deploy from GitHub
4. Repository: https://github.com/fffoxie/FPLFS

## APK Patching

### Pre-patched APK (Ready to Use)
Download: https://gofile.io/d/yvEYLNE4

### Patch Your Own APK
```bash
python3 patcher.py Frever.apk 192.168.1.XXX:3000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/connect/token` | POST | OAuth token exchange |
| `/account/register` | POST | Register account |
| `/account/login` | POST | Login |
| `/profile` | GET/PUT | User profile |
| `/video/feed` | GET | Video feed |
| `/video/upload` | POST | Upload video |
| `/social/like` | POST | Like video |
| `/social/follow` | POST | Follow user |
| `/character/Characters` | GET/POST | Character wardrobe |
| `/crew` | GET/POST | Crews |
| `/chat/message` | POST | Send message |
| `/chat/history` | GET | Chat history |

## Resources

- **Patched APK:** https://gofile.io/d/yvEYLNE4
- **Server ZIP:** https://gofile.io/d/GpGUemDe (111MB)
- **GitHub:** https://github.com/fffoxie/FPLFS

---

**Created by FFFoxie • MIT License**