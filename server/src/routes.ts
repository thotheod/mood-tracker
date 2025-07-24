import express, { Request, Response } from "express";
import { readMoods, writeMood } from "./storage";
import { Mood } from "./types";

const router = express.Router();

router.get("/moods", async (req: Request, res: Response<Mood[] | { error: string }>) => {
  try {
    const moods = await readMoods();
    res.json(moods);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/moods", async (req: Request, res: Response<Mood | { error: string }>) => {
  try {
    const { mood, note, date } = req.body;
    if (!mood || !date) return res.status(400).json({ error: "Mood and date are required." });
    const newMood = await writeMood({ mood, note, date });
    res.json(newMood);
  } catch {
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
