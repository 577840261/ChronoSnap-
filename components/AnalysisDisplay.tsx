import React from 'react';
import { RotateCcw, Home, Copy } from 'lucide-react';
import { Button } from './Button';

interface AnalysisDisplayProps {
  imageSrc: string;
  analysisText: string;
  onReset: () => void;
  onRetry: () => void;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ 
  imageSrc, 
  analysisText, 
  onReset,
  onRetry 
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(cleanText(analysisText));
  };

  // Function to remove markdown syntax like ###, **, *, etc.
  const cleanText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/#{1,6}\s?/g, '') // Remove headers
      .replace(/\*\*/g, '')      // Remove bold
      .replace(/\*/g, '• ')      // Replace list bullets with a simple dot
      .replace(/`/g, '')         // Remove code ticks
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
      .trim();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-lg bg-black">
            <img src={imageSrc} alt="Analyzed" className="w-full h-auto opacity-90" />
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <Button onClick={onRetry} variant="secondary" fullWidth>
              <RotateCcw size={18} /> 分析另一张
            </Button>
            <Button onClick={onReset} variant="ghost" fullWidth>
              <Home size={18} /> 返回主页
            </Button>
          </div>
        </div>

        {/* Text Result Column */}
        <div className="w-full md:w-2/3 flex flex-col h-full">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700 p-6 shadow-xl flex-grow">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-4">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Gemini 分析结果
              </h2>
              <button 
                onClick={handleCopy}
                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
                title="复制文本"
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="prose prose-invert prose-slate max-w-none overflow-y-auto max-h-[60vh] pr-2 scrollbar-hide">
              <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                {cleanText(analysisText)}
              </p>
            </div>
          </div>
          
          <div className="flex md:hidden flex-col gap-3 mt-6">
            <Button onClick={onRetry} variant="secondary" fullWidth>
              <RotateCcw size={18} /> 分析另一张
            </Button>
            <Button onClick={onReset} variant="ghost" fullWidth>
              <Home size={18} /> 返回主页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};