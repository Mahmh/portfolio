import path from "path";
import fs from "fs";
import express, { type Request, type Response } from "express";

const FRONTEND_PORT = 5173;
const app = express();
const distPath = path.resolve(__dirname, "..", "dist");

if (!fs.existsSync(distPath)) {
  console.error(`dist folder not found at ${distPath}`);
  process.exit(1);
}

console.log(`Serving static files from ${distPath}`);

// SSG
app.use(express.static(distPath));
app.get(/.*/, (_: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(FRONTEND_PORT, () => {
  console.log(`Frontend server running at http://localhost:${FRONTEND_PORT}`);
});
