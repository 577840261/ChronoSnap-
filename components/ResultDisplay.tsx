import React, { useState } from 'react';
import { Download, RotateCcw, Home, Film } from 'lucide-react';
import { Button } from './Button';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
  title: string;
  description: string;
  onReset: () => void;
  onRetry: () => void;
  color?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  originalImage, 
  generatedImage, 
  title,
  description,
  onReset,
  onRetry,
  color = "from-indigo-400 to-purple-400"
}) => {
  const [isGifLoading, setIsGifLoading] = useState(false);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `chrono-snap-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportGif = () => {
    if (!window.gifshot) {
      console.error("Gifshot library not loaded");
      return;
    }

    setIsGifLoading(true);

    // Create a temporary image to get dimensions
    const img = new Image();
    img.onload = () => {
      // Calculate dimensions (max width 500px to keep file size reasonable)
      const aspectRatio = img.height / img.width;
      const gifWidth = Math.min(500, img.width);
      const gifHeight = Math.round(gifWidth * aspectRatio);

      window.gifshot.createGIF({
        images: [originalImage, generatedImage],
        gifWidth: gifWidth,
        gifHeight: gifHeight,
        interval: 0.6, // Seconds per frame
        numFrames: 10, // Not strictly used for image arrays in the way video is, but required
        text: ''
      }, (obj: any) => {
        if (!obj.error) {
          const link = document.createElement('a');
          link.href = obj.image;
          link.download = `chrono-snap-anim-${Date.now()}.gif`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("GIF creation failed", obj.errorCode);
          alert("生成 GIF 失败，请重试");
        }
        setIsGifLoading(false);
      });
    };
    img.onerror = () => {
      setIsGifLoading(false);
      alert("无法加载图像以生成 GIF");
    };
    img.src = generatedImage;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color} mb-2`}>
          生成成功！
        </h2>
        <p className="text-slate-400">{title}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-10">
        
        {/* Original (Smaller) */}
        <div className="relative group w-48 lg:w-64 flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700">
            <img src={originalImage} alt="Original" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center text-xs font-medium text-slate-300 backdrop-blur-sm">
              原始图像
            </div>
          </div>
        </div>

        {/* Arrow for desktop */}
        <div className="hidden lg:block text-slate-600">
           <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>

        {/* Generated (Large) */}
        <div className="relative group w-full max-w-md lg:max-w-lg">
          <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 animate-pulse`}></div>
          <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img src={generatedImage} alt={`Generated`} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
               <h3 className="text-white text-2xl font-bold">{title}</h3>
               <p className="text-white/80 text-sm">{description}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleDownload} variant="primary">
          <Download size={20} /> 下载图片
        </Button>
        <Button onClick={handleExportGif} variant="primary" isLoading={isGifLoading}>
          <Film size={20} /> 导出动图
        </Button>
        <Button onClick={onRetry} variant="secondary">
          <RotateCcw size={20} /> 再试一次
        </Button>
        <Button onClick={onReset} variant="ghost">
          <Home size={20} /> 返回主页
        </Button>
      </div>
    </div>
  );
};