import React, { useState } from 'react';
import { Mood } from '../types';

interface MoodFormProps {
  onSubmit: (mood: Omit<Mood, 'id'>) => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onSubmit }) => {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;

    const newMood = {
      mood,
      note,
      date: new Date().toISOString()
    };

    onSubmit(newMood);
    setMood('');
    setNote('');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-700/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="mood" className="block text-sm font-medium text-slate-300">
            Mood:
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/50 rounded-lg border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Select mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Excited">Excited</option>
            <option value="Anxious">Anxious</option>
            <option value="Calm">Calm</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="note" className="block text-sm font-medium text-slate-300">
            Note:
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note"
            className="w-full px-3 py-2 bg-slate-900/50 rounded-lg border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={!mood}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        >
          Log Mood
        </button>
      </form>
    </div>
  );
};

export default MoodForm;
