import React, { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface TextInputProps {
  onSubmit: (prompt: string) => void;
  onBack: () => void;
  title: string;
  placeholder: string;
  imageSrc: string;
}

export const TextInput: React.FC<TextInputProps> = ({ onSubmit, onBack, title, placeholder, imageSrc }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-start animate-fade-in">
      <div className="w-full md:w-1/3">
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> 返回
        </button>
        <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
          <img src={imageSrc} alt="Preview" className="w-full h-auto" />
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="w-full h-40 bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none mb-6"
            autoFocus
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!prompt.trim()}>
              <Send size={18} /> 提交
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};