const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const db = require("./database");
app.use(cors());
app.use(express.json());
const PORT = 3000;
app.get("/trending", async (req, res) => {
  try {
    const response = await axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
    const podcasts = response.data.feed.entry;
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
  
});
app.get("/search", async (req, res) => {
  const { term } = req.query;
  if (!term) {
    return res.status(400).json({ error: "missing" });
  }
  try {
    const response = await axios.get("https://itunes.apple.com/search", {
      params: {
        term: term,
        media: "podcast",
      },
    });

    const results = response.data.results;
    res.json(results);
    results.forEach((result) => {
      db.run(
        "INSERT INTO podcasts (collectionId, trackName, artistName, trackViewUrl, artworkUrl600, genre,releaseDate) VALUES (?, ?, ?, ?, ?, ?,?)",
        [
          result.collectionId,
          result.trackName,
          result.artistName,
          result.trackViewUrl,
          result.artworkUrl600,
          result.genre,
          result.releaseDate
        ]
      );
    });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
