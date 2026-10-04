const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: 'application/octet-stream' }));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/client/urls', (req, res) => {
  res.json({
    videoBaseUrl: process.env.VIDEO_BASE_URL || 'https://example.com/videos',
    avatarBaseUrl: process.env.AVATAR_BASE_URL || 'https://example.com/avatars'
  });
});

app.get('/api/Client/SupportedVersions', (req, res) => {
  res.json({ supportedVersions: ['4.0.5'] });
});

// Bridge endpoint
app.post('/reroute', require('./bridge'));

// Auth routes
app.post('/connect/token', require('./routes/auth'));
app.post('/account/register', require('./routes/auth'));
app.post('/account/login', require('./routes/auth'));

// Profile routes
app.get('/profile', require('./routes/profile'));
app.put('/profile', require('./routes/profile'));

// Video routes
app.get('/video/feed', require('./routes/video'));
app.get('/video/trending', require('./routes/video'));
app.post('/video/upload', require('./routes/video'));

// Social routes
app.post('/social/like', require('./routes/social'));
app.post('/social/follow', require('./routes/social'));
app.get('/social/search', require('./routes/social'));

// Character routes
app.get('/character/Characters', require('./routes/wardrobe'));
app.post('/character/Characters', require('./routes/wardrobe'));

// Crew routes
app.get('/crew', require('./routes/crew'));
app.post('/crew', require('./routes/crew'));
app.post('/crew/join', require('./routes/crew'));

// Chat routes
app.post('/chat/message', require('./routes/chat'));
app.get('/chat/history', require('./routes/chat'));

// Task routes
app.get('/task', require('./routes/task'));
app.post('/task', require('./routes/task'));

// Asset routes
app.get('/asset', require('./routes/asset'));

// Misc routes
app.get('/startpack', require('./routes/misc'));

app.listen(PORT, () => {
  console.log('FPLFS server running on port ' + PORT);
});