import React from 'react';
import { Mood } from '../types';

interface MoodListProps {
  moods: Mood[];
}

const MoodList: React.FC<MoodListProps> = ({ moods }) => {
  return (
    <div className="space-y-4">
      {moods.map((mood) => (
        <div
          key={mood.id}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-700/50 hover:border-slate-600/50 hover:shadow-2xl transition-all duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-white/90">{mood.mood}</h3>
              {mood.note && (
                <p className="mt-2 text-slate-400/90 leading-relaxed">{mood.note}</p>
              )}
            </div>
            <time className="text-sm text-slate-400/75">
              {new Date(mood.date).toLocaleDateString()}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodList;
