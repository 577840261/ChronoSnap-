import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  title?: string;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState(true);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("无法访问摄像头。请允许权限或上传文件。");
      setIsStreamActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
    }
  };

  useEffect(() => {
    if (cameraMode) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [cameraMode]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onCapture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/50 rounded-3xl p-6 backdrop-blur-sm border border-slate-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          {cameraMode ? <><Camera size={24} className="text-indigo-400" /> {title || "拍摄照片"}</> : <><Upload size={24} className="text-indigo-400" /> 上传照片</>}
        </h2>
        <button 
          onClick={() => setCameraMode(!cameraMode)}
          className="text-xs font-semibold text-slate-400 hover:text-white uppercase tracking-wider flex items-center gap-1 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700 hover:border-indigo-500 transition-colors"
        >
          {cameraMode ? '切换到上传' : '切换到相机'}
        </button>
      </div>

      <div className="relative aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-inner border-2 border-slate-800 mb-6 group">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-red-400 bg-slate-900/90 z-10">
            {error}
          </div>
        )}
        
        {cameraMode ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover transform -scale-x-100"
            />
            {isStreamActive && (
               <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                <button 
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full border-4 border-white/80 bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all duration-300 flex items-center justify-center group-hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  <div className="w-16 h-16 bg-white rounded-full"></div>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 border-2 border-dashed border-slate-700 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <ImageIcon size={64} className="mb-4 opacity-50" />
            <p className="font-medium">点击选择文件</p>
            <p className="text-xs mt-2 text-slate-600">JPG, PNG 最大 5MB</p>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <p className="text-center text-slate-400 text-sm">
        {cameraMode ? "将脸部对准框内" : "选择一张清晰的照片"}
      </p>
    </div>
  );
};