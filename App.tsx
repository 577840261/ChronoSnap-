import React, { useState } from 'react';
import { CameraCapture } from './components/CameraCapture';
import { EraSelector } from './components/EraSelector';
import { FeatureSelector } from './components/FeatureSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { TextInput } from './components/TextInput';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { AppState, AppMode, Era } from './types';
import { generateTimeTravelImage, editImageWithPrompt, analyzeImage } from './services/geminiService';
import { Sparkles, Zap, Aperture } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  const [appMode, setAppMode] = useState<AppMode | null>(null);
  
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---

  const handleModeSelect = (mode: AppMode) => {
    setAppMode(mode);
    setAppState(AppState.CAPTURE);
    setError(null);
  };

  const handleCapture = (imageSrc: string) => {
    setSourceImage(imageSrc);
    if (appMode === AppMode.TIME_TRAVEL) {
      setAppState(AppState.SELECT_ERA);
    } else {
      setAppState(AppState.INPUT_PROMPT);
    }
  };

  const handleEraSelect = async (era: Era) => {
    if (!sourceImage) return;
    setSelectedEra(era);
    setAppState(AppState.PROCESSING);
    setError(null);

    try {
      const result = await generateTimeTravelImage(sourceImage, era.promptModifier);
      setGeneratedImage(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("时光机发生故障！请重试。");
      setAppState(AppState.SELECT_ERA);
    }
  };

  const handlePromptSubmit = async (prompt: string) => {
    if (!sourceImage || !appMode) return;
    setUserPrompt(prompt);
    setAppState(AppState.PROCESSING);
    setError(null);

    try {
      if (appMode === AppMode.MAGIC_EDITOR) {
        const result = await editImageWithPrompt(sourceImage, prompt);
        setGeneratedImage(result);
        setAppState(AppState.RESULT);
      } else if (appMode === AppMode.IMAGE_ANALYST) {
        const result = await analyzeImage(sourceImage, prompt);
        setAnalysisResult(result);
        setAppState(AppState.RESULT);
      }
    } catch (err) {
      console.error(err);
      setError("处理请求时出错。请重试。");
      setAppState(AppState.INPUT_PROMPT);
    }
  };

  // --- Reset / Navigation Helpers ---

  const resetApp = () => {
    setSourceImage(null);
    setGeneratedImage(null);
    setAnalysisResult(null);
    setSelectedEra(null);
    setUserPrompt('');
    setAppMode(null);
    setAppState(AppState.MENU);
    setError(null);
  };

  const retryStep = () => {
    setGeneratedImage(null);
    setAnalysisResult(null);
    if (appMode === AppMode.TIME_TRAVEL) {
      setSelectedEra(null);
      setAppState(AppState.SELECT_ERA);
    } else {
      setAppState(AppState.INPUT_PROMPT);
    }
  };

  // --- Dynamic UI Strings based on Mode ---
  
  const getProcessingMessage = () => {
    if (appMode === AppMode.TIME_TRAVEL) return `正在穿越至 ${selectedEra?.title}...`;
    if (appMode === AppMode.MAGIC_EDITOR) return "正在施展魔法...";
    if (appMode === AppMode.IMAGE_ANALYST) return "正在分析图像...";
    return "处理中...";
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] text-slate-200 selection:bg-indigo-500 selection:text-white flex flex-col">
      
      {/* Header */}
      <header className="p-6 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 text-2xl font-bold tracking-tighter cursor-pointer group"
            onClick={resetApp}
          >
            <div className="relative">
              <Aperture className="text-indigo-500 w-8 h-8 animate-spin-slow group-hover:text-pink-500 transition-colors" />
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:from-indigo-400 group-hover:to-pink-400 transition-all">
              ChronoSnap
            </span>
          </div>
          
          {appState !== AppState.MENU && (
            <button 
              onClick={resetApp}
              className="text-sm font-medium text-slate-500 hover:text-white transition-colors"
            >
              返回菜单
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 relative">
        
        {/* Ambient background glow */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        {error && (
          <div className="w-full max-w-md mb-8 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center gap-3 animate-shake">
            <Zap size={20} />
            {error}
          </div>
        )}

        {/* --- STATE: MENU --- */}
        {appState === AppState.MENU && (
          <div className="animate-fade-in w-full">
            <FeatureSelector onSelect={handleModeSelect} />
          </div>
        )}

        {/* --- STATE: CAPTURE --- */}
        {appState === AppState.CAPTURE && (
          <div className="animate-fade-in w-full flex flex-col items-center">
             <div className="text-center mb-8 max-w-2xl">
              <h1 className="text-3xl font-bold text-white mb-4">
                {appMode === AppMode.TIME_TRAVEL && "准备穿越时空"}
                {appMode === AppMode.MAGIC_EDITOR && "上传需要编辑的照片"}
                {appMode === AppMode.IMAGE_ANALYST && "上传需要分析的照片"}
              </h1>
            </div>
            <CameraCapture 
              onCapture={handleCapture} 
              title={appMode === AppMode.TIME_TRAVEL ? "拍张自拍" : "拍摄照片"}
            />
             <button 
              onClick={resetApp}
              className="mt-6 text-slate-500 hover:text-slate-300 transition-colors"
            >
              取消
            </button>
          </div>
        )}

        {/* --- STATE: SELECT ERA (Time Travel Only) --- */}
        {appState === AppState.SELECT_ERA && (
          <div className="animate-fade-in w-full">
            <EraSelector onSelect={handleEraSelect} onBack={() => setAppState(AppState.CAPTURE)} />
          </div>
        )}

        {/* --- STATE: INPUT PROMPT (Editor & Analyst) --- */}
        {appState === AppState.INPUT_PROMPT && sourceImage && (
          <div className="animate-fade-in w-full">
            <TextInput 
              title={appMode === AppMode.MAGIC_EDITOR ? "你想怎么修改这张照片？" : "关于这张照片，你想知道什么？"}
              placeholder={appMode === AppMode.MAGIC_EDITOR ? "例如：添加复古滤镜、把背景变成海滩..." : "例如：描述这张图片、这是什么植物..."}
              imageSrc={sourceImage}
              onSubmit={handlePromptSubmit}
              onBack={() => setAppState(AppState.CAPTURE)}
            />
          </div>
        )}

        {/* --- STATE: PROCESSING --- */}
        {appState === AppState.PROCESSING && (
          <div className="flex flex-col items-center justify-center animate-fade-in">
            <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-purple-500 border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Sparkles className="text-white w-10 h-10 animate-pulse" />
               </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{getProcessingMessage()}</h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xs text-center">
              Gemini AI 正在处理您的请求，请稍候...
            </p>
          </div>
        )}

        {/* --- STATE: RESULT (Time Travel & Editor) --- */}
        {appState === AppState.RESULT && appMode !== AppMode.IMAGE_ANALYST && sourceImage && generatedImage && (
          <ResultDisplay 
            originalImage={sourceImage}
            generatedImage={generatedImage}
            title={appMode === AppMode.TIME_TRAVEL && selectedEra ? selectedEra.title : "魔法编辑完成"}
            description={appMode === AppMode.TIME_TRAVEL && selectedEra ? selectedEra.description : `指令: ${userPrompt}`}
            color={appMode === AppMode.MAGIC_EDITOR ? "from-pink-400 to-rose-500" : undefined}
            onReset={resetApp}
            onRetry={retryStep}
          />
        )}

        {/* --- STATE: RESULT (Analyst) --- */}
        {appState === AppState.RESULT && appMode === AppMode.IMAGE_ANALYST && sourceImage && analysisResult && (
          <AnalysisDisplay
            imageSrc={sourceImage}
            analysisText={analysisResult}
            onReset={resetApp}
            onRetry={retryStep}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-slate-600 text-sm border-t border-slate-800/50">
        <p>Powered by Gemini 2.5 Flash & 3.0 Pro &bull; ChronoSnap © 2025</p>
      </footer>
    </div>
  );
};

export default App;