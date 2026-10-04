const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../data/fplfs.db'));

// Initialize tables
const init = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, username TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);"
    + "CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, url TEXT, likes INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);"
    + "CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT, outfit TEXT);"
    + "CREATE TABLE IF NOT EXISTS crews (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_by INTEGER);"
    + "CREATE TABLE IF NOT EXISTS crew_members (crew_id INTEGER, user_id INTEGER, role TEXT DEFAULT 'member');"
  );
};

init();

module.exports = db;