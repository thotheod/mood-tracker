import fs from "fs/promises";
import path from "path";
import { Mood } from "./types";

const MOODS_PATH = path.join(__dirname, "..", "moods.json");

export async function readMoods(): Promise<Mood[]> {
  try {
    const data = await fs.readFile(MOODS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeMood(mood: Omit<Mood, "id">): Promise<Mood> {
  const moods = await readMoods();
  const newMood: Mood = { ...mood, id: Date.now().toString() };
  moods.unshift(newMood);
  await fs.writeFile(MOODS_PATH, JSON.stringify(moods, null, 2));
  return newMood;
}
