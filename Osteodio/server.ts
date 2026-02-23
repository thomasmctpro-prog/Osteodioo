import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("podcasts.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS podcasts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    duration TEXT,
    episode TEXT,
    image TEXT,
    audio_data BLOB,
    mime_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // API Routes
  app.get("/api/podcasts", (req, res) => {
    const podcasts = db.prepare("SELECT id, title, duration, episode, image, mime_type FROM podcasts ORDER BY created_at DESC").all();
    res.json(podcasts);
  });

  app.get("/api/podcasts/:id/audio", (req, res) => {
    const podcast = db.prepare("SELECT audio_data, mime_type FROM podcasts WHERE id = ?").get(req.params.id) as any;
    if (!podcast || !podcast.audio_data) {
      return res.status(404).send("Audio not found");
    }
    res.setHeader("Content-Type", podcast.mime_type || "audio/mpeg");
    res.send(podcast.audio_data);
  });

  app.post("/api/podcasts", (req, res) => {
    const { title, duration, episode, image, audioData, mimeType } = req.body;
    
    // Convert base64 to Buffer
    const buffer = Buffer.from(audioData.split(",")[1], "base64");

    const info = db.prepare(`
      INSERT INTO podcasts (title, duration, episode, image, audio_data, mime_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, duration, episode, image, buffer, mimeType);

    res.json({ id: info.lastInsertRowid, title, duration, episode, image });
  });

  app.delete("/api/podcasts/:id", (req, res) => {
    db.prepare("DELETE FROM podcasts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
