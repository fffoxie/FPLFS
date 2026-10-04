# Frever Private Local Server (FPLFS)

A complete replacement for the original C#/.NET Frever backend — running as a private local server on your own machine. Zero budget, zero third-party adapters.

## What this is

- **Node.js** server using `protobufjs` to speak the same protobuf-net protocol the Frever client expects
- **Single `/reroute` gateway** — no REST adapter layer, no Xano, no Termux
- **SQLite** database via `sql.js` (pure JavaScript, no native compilation needed)
- **Render** for cloud hosting (free tier) — or run locally with `npm start`

## Step-by-step setup

### 1. Fork the repo

Go to [https://github.com/fffoxie/FPLFS](https://github.com/fffoxie/FPLFS) and click **Fork**.

### 2. Deploy to Render (free)

1. Go to [https://render.com](https://render.com) and sign up (free tier)
2. Click **New** → **Web Service**
3. Connect your GitHub account and select the **FPLFS** repo
4. Render auto-detects `render.yaml` — confirm these settings:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Plan:** Free
   - **Region:** iad (US East)
5. Click **Create Web Service**

### 3. Set environment variables

After creating the service, go to **Settings** → **Environment** and set these:

| Key | Value | Notes |
|---|---|---|
| `JWT_SECRET` | Any random string, e.g. output of `openssl rand -hex 32` | Used for JWT token signing in auth |
| `PORT` | `3000` | Render sets this automatically too |
| `VIDEO_BASE_URL` | `http://YOUR_RENDER_URL:3000` | Base URL for video assets (set to your Render URL) |
| `AVATAR_BASE_URL` | `http://YOUR_RENDER_URL:3000` | Base URL for avatars (set to your Render URL) |

> Avatars and in-app accessories are built into the Frever client and don't need external hosting. Set both URL vars to your Render app URL or leave them as-is for local use.

### 4. Deploy

Click **Deploy** on Render. Wait ~2 minutes for the build to finish. Your server URL will be something like `https://fplfs-frever-server.onrender.com`.

### 5. Patch the APK

You have two options:

**Option A — Use the pre-patched APK (easiest)**

Download the pre-patched APK from the [GoFile release](https://gofile.io/d/yvEYLNE0). It already has the server IP swapped to `127.0.0.1:3000`.

**Option B — Patch your own APK**

```bash
python3 patcher.py Frever.apk
```

The patcher modifies `global-metadata.dat` inside the APK, replacing the original server IP with your local address.

### 6. Install and use

1. Install the patched APK on your phone (allow "Install from unknown sources" in settings)
2. Open Frever — it will connect to your server
3. Register a new account (the server creates users in SQLite)
4. Done — you're running a private Frever server

## Deploy fix (2026-10-04)

The initial deploy failed because `better-sqlite3` v9.x requires native C++ compilation that breaks on Render's Node.js v24 runtime. The fix:

- Replaced `better-sqlite3` with `sql.js` — a pure JavaScript SQLite implementation with no native bindings
- Updated `src/database.js` to use `sql.js` API (`new SQL.Database()`, `db.exec()`, `db.prepare()`, `db.export()`)
- Fixed route files that used `stmt.run().lastInsertRowid` — `sql.js` returns `undefined` from `run()`, so we now query `last_insert_rowid()` explicitly

## API endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/health` | GET | Health check |
| `/api/client/urls` | GET | Returns `videoBaseUrl` and `avatarBaseUrl` |
| `/api/client/supportedVersions` | GET | Lists supported client versions |
| `/reroute` | POST | Protobuf gateway (all Frever client requests) |
| `/connect/token` | POST | Login, returns JWT |
| `/account/register` | POST | Register new account |
| `/account/login` | POST | Login (returns token) |
| `/account/logout` | POST | Invalidate token |
| `/profile` | GET/PUT | User profile |
| `/videos/feed` | GET | Video feed |
| `/videos/trending` | GET | Trending videos |
| `/videos/upload` | POST | Upload video |
| `/social/like` | POST | Like a video |
| `/social/follow` | POST | Follow a user |
| `/chat/message` | POST | Send chat message |
| `/chat/history` | GET | Get chat history |
| `/crew/create` | POST | Create a crew |
| `/crew/members` | GET | List crew members |
| `/task` | GET/POST | Task system |
| `/asset/upload` | POST | Upload asset |

## Local development

```bash
npm install
npm run dev
```

Creates `data/fplfs.db` automatically on first run.

## Resources

- [Pre-patched APK (GoFile)](https://gofile.io/d/yvEYLNE0)
- [GitHub repo](https://github.com/fffoxie/FPLFS)
- [Render Dashboard](https://dashboard.render.com)

---

Created by FFFoxie. MIT License.
