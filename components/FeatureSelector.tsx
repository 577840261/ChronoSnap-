import React from 'react';
import { AppMode } from '../types';
import { Hourglass, Wand2, ScanSearch } from 'lucide-react';

interface FeatureSelectorProps {
  onSelect: (mode: AppMode) => void;
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({ onSelect }) => {
  const features = [
    {
      mode: AppMode.TIME_TRAVEL,
      title: '时空穿越',
      description: '拍张自拍，穿越到咆哮的二十年代、赛博朋克未来等历史时刻。',
      icon: <Hourglass size={48} />,
      color: 'from-indigo-500 to-purple-600',
      border: 'hover:border-indigo-500'
    },
    {
      mode: AppMode.MAGIC_EDITOR,
      title: '魔法编辑',
      description: '使用文字指令编辑照片。“添加复古滤镜”、“移除背景中的人”。',
      icon: <Wand2 size={48} />,
      color: 'from-pink-500 to-rose-600',
      border: 'hover:border-pink-500'
    },
    {
      mode: AppMode.IMAGE_ANALYST,
      title: '智能识图',
      description: '上传照片，Gemini 将为你分析图片内容、识别物体或回答问题。',
      icon: <ScanSearch size={48} />,
      color: 'from-cyan-500 to-blue-600',
      border: 'hover:border-cyan-500'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          ChronoSnap
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          由 Gemini 提供支持的下一代 AI 图像工具套件。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <button
            key={feature.mode}
            onClick={() => onSelect(feature.mode)}
            className={`group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-slate-700 ${feature.border}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-400 group-hover:text-slate-200 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-8 flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                开始使用 <span className="ml-2">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};