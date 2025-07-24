import React, { useEffect, useState } from "react";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import ThemeToggle from "./components/ThemeToggle";
import { Mood } from "./types";

const API_URL = "http://localhost:4000/moods";

const App: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setMoods)
      .catch(() => setMoods([]));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addMood = async (mood: Omit<Mood, "id">) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mood),
    });
    if (res.ok) {
      const newMood: Mood = await res.json();
      setMoods(prev => [newMood, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4" id="root">
      <div className="max-w-2xl mx-auto">
        <ThemeToggle />
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Mood Tracker
        </h1>
        <MoodForm onAddMood={addMood} />
        <MoodList moods={moods} />
        
      </div>
    </div>
  );
};

export default App;
