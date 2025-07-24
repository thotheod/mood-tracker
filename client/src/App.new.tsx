import React, { useState, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import { Mood } from './types';

const App: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/moods');
        if (!response.ok) throw new Error('Failed to fetch moods');
        const data = await response.json();
        setMoods(data);
      } catch (error) {
        console.error('Failed to fetch moods:', error);
      }
    };
    fetchMoods();
  }, []);

  const handleAddMood = async (newMood: Omit<Mood, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3001/api/moods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMood),
      });
      
      if (!response.ok) throw new Error('Failed to add mood');
      const savedMood = await response.json();
      setMoods(prev => [savedMood, ...prev]);
    } catch (error) {
      console.error('Failed to add mood:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans antialiased">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Mood Tracker</h1>
          <ThemeToggle />
        </header>

        <MoodForm onSubmit={handleAddMood} />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Mood History</h2>
          <MoodList moods={moods} />
        </section>
      </div>
    </div>
  );
};

export default App;
