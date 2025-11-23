import React from 'react';
import { Era } from '../types';
import { ERAS } from '../constants';
import { Clock } from 'lucide-react';

interface EraSelectorProps {
  onSelect: (era: Era) => void;
  onBack: () => void;
}

export const EraSelector: React.FC<EraSelectorProps> = ({ onSelect, onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← 重拍
        </button>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center gap-2">
          <Clock size={24} className="text-indigo-400" /> 选择你的命运
        </h2>
        <div className="w-20"></div> {/* Spacer for center alignment */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => onSelect(era)}
            className="group relative overflow-hidden bg-slate-800 rounded-2xl p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 text-left"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${era.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative bg-slate-900/90 h-full p-5 rounded-xl border border-slate-700 group-hover:border-transparent transition-colors z-10 flex flex-col">
              <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">{era.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{era.title}</h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 mb-4 flex-grow">{era.description}</p>
              <div className="mt-auto flex items-center text-indigo-400 text-sm font-bold group-hover:text-indigo-300">
                立即穿越 <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
            
            {/* Decorative border gradient on hover */}
            <div className={`absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br ${era.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
          </button>
        ))}
      </div>
    </div>
  );
};