import React from "react";
import { Mood } from "../types";

interface MoodListProps {
  moods: Mood[];
}

const MoodList: React.FC<MoodListProps> = ({ moods }) => (
  <div className="mt-8 max-w-md mx-auto">
    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Mood History</h2>
    <div className="space-y-3">
      {moods.map(m => (
        <div
          key={m.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800 dark:text-white">{m.mood}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(m.date).toLocaleDateString()}
            </span>
          </div>
          {m.note && (
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{m.note}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default MoodList;
