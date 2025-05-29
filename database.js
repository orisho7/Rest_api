const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.db");
db.run(`
    CREATE TABLE IF NOT EXISTS podcasts (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
    collectionId INTEGER,
    trackName TEXT,
    artistName TEXT,
	trackViewUrl TEXT,
    artworkUrl600 TEXT,
	genre TEXT,
    releaseDate TEXT
    )
  `);

module.exports = db;
