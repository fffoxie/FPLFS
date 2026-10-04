# Frever Private Local Server (FPLFS)

**A complete replacement server for the Frever social video app — $0 budget, school-browser friendly, deployed on Render.**

## Quick Start (Render Free Tier)

### 1. Fork the repo
https://github.com/fffoxie/FPLFS → Fork

### 2. Deploy on Render
1. Go to https://render.com
2. Sign up (free)
3. New Web Service → Connect GitHub → Choose YOUR_USERNAME/FPLFS
4. Set:
   - Build: `npm install`
   - Start: `npm start`
   - Add env vars: `JWT_SECRET`, `PORT=3000`
5. Click **Create Web Service**
6. Wait for deploy (~2 min)

### 3. Patch the APK
- Pre-patched APK: https://gofile.io/d/yvEYLNE4
- Or patch your own: `python3 patcher.py Frever.apk https://YOUR_APP.onrender.com`

### 4. Install on phone
1. Uninstall original Frever
2. Settings → Apps → Special Access → Install unknown apps
3. Open downloaded APK → Install
4. Open Frever → login/register

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
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
- **GitHub:** https://github.com/fffoxie/FPLFS
- **Render Dashboard:** https://dashboard.render.com

---

**Created by FFFoxie • MIT License**