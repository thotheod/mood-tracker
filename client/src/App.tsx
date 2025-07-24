import React, { useEffect, useState } from "react";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import ThemeToggle from "./components/ThemeToggle";
import { Mood } from "./types";

const API_URL = "http://localhost:4000/moods";

const App: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [isDark, setIsDark] = useState(() => {
    // Load theme preference from localStorage on initial render
    try {
      const savedTheme = localStorage.getItem('mood-tracker-theme');
      return savedTheme === 'dark';
    } catch {
      return false; // Fallback for SSR or localStorage unavailable
    }
  });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setMoods)
      .catch(() => setMoods([]));
  }, []);

  useEffect(() => {
    // Apply theme to document and save to localStorage
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    try {
      localStorage.setItem('mood-tracker-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore localStorage errors (e.g., in private browsing mode)
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
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
