'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Loader2, Volume2, Play, Square } from 'lucide-react';

const VisionComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  // Interval ref to clear on unmount or stop
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // If not live, show the captured image
      if (!isLive) setImgSrc(imageSrc);
      analyzeImage(imageSrc);
    }
  }, [webcamRef, isLive]);

  const toggleLiveMode = () => {
    if (isLive) {
      // Stop live mode
      setIsLive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.speechSynthesis.cancel(); // Stop speaking
    } else {
      // Start live mode
      setIsLive(true);
      setImgSrc(null); // Clear static image
      setAnalysis("Starting live guidance...");
      setError(null);
    }
  };

  useEffect(() => {
    if (isLive) {
      // Initial capture
      capture();
      // Set interval for every 5 seconds (to avoid rate limits and overlapping audio)
      intervalRef.current = setInterval(() => {
        if (!loading) { // Only capture if previous request finished
            capture();
        }
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive, capture]); // loading is intentionally left out to avoid resetting interval constantly

  const retake = () => {
    setImgSrc(null);
    setAnalysis(null);
    setError(null);
  };

  const analyzeImage = async (base64Image: string) => {
    if (loading) return; // Prevent overlapping requests
    
    setLoading(true);
    // Don't clear error immediately in live mode to avoid flickering
    if (!isLive) setError(null); 

    try {
      // Convert base64 to blob
      const res = await fetch(base64Image);
      const blob = await res.blob();
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/v1/vision/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        console.error("Backend Error:", errorData);
        throw new Error(errorData.detail || 'Failed to analyze scene');
      }

      const data = await response.json();
      setAnalysis(data.description);
      
      // Auto-speak in live mode or normal mode
      if (data.description) {
        speak(data.description);
      }

    } catch (err) {
      console.error(err);
      if(!isLive) setError('Could not analyze the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel previous utterance if live to avoid queue buildup
      if (isLive) window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1; // Slightly faster for real-time feel
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg dark:bg-zinc-800">
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {isLive ? "Live Guide (Beta)" : "Vision Assistant"}
        </h2>
        
        {/* Live Mode Toggle */}
        <button
            onClick={toggleLiveMode}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isLive 
                ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400' 
                : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
            }`}
        >
            {isLive ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            {isLive ? "Stop Live" : "Start Live Mode"}
        </button>
      </div>

      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
        {imgSrc && !isLive ? (
          <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: "environment" }}
          />
        )}
        
        {/* Live Indicator Overlay */}
        {isLive && (
            <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-xs font-medium">LIVE</span>
            </div>
        )}
      </div>

      {/* Manual Controls (Hidden in Live Mode except Stop) */}
      {!isLive && (
          <div className="flex gap-4 mb-4">
            {!imgSrc ? (
              <button
                onClick={capture}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Camera size={20} />
                Capture Scene
              </button>
            ) : (
              <button
                onClick={retake}
                className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                disabled={loading}
              >
                <RefreshCw size={20} />
                Retake
              </button>
            )}
          </div>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Loader2 className="animate-spin" size={18} />
          <span className="text-sm">Scanning surroundings...</span>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm text-center mb-2">{error}</div>
      )}

      {analysis && (
        <div className={`p-4 rounded-lg w-full transition-colors ${isLive ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' : 'bg-gray-50 dark:bg-zinc-700'}`}>
          <div className="flex justify-between items-start">
             <h3 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-300">
                {isLive ? "Live Guidance" : "Description"}
             </h3>
             <button onClick={() => speak(analysis)} className="text-blue-500 hover:text-blue-600">
                <Volume2 size={16}/>
             </button>
          </div>
          <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default VisionComponent;
