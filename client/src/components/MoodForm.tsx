import React, { useState } from "react";
import { Mood } from "../types";

interface MoodFormProps {
  onAddMood: (mood: Omit<Mood, "id">) => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onAddMood }) => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;
    onAddMood({ mood, note, date: new Date().toISOString() });
    setMood("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Mood:
          <select
            value={mood}
            onChange={e => setMood(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Neutral">Neutral</option>
            <option value="Excited">Excited</option>
            <option value="Angry">Angry</option>
          </select>
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Note:
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Optional note"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Log Mood
      </button>
    </form>
  );
};

export default MoodForm;
