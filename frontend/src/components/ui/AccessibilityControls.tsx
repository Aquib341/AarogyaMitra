"use client";

import { useAccessibility } from "@/context/AccessibilityContext";
import { Eye, Type, Volume2, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AccessibilityControls() {
  const { 
    highContrast, toggleHighContrast, 
    increaseFontSize, decreaseFontSize, 
    voiceMode, toggleVoiceMode 
  } = useAccessibility();
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-3 min-w-[200px]"
          >
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Accessibility</h3>
            
            {/* High Contrast Toggle */}
            <button 
              onClick={toggleHighContrast}
              className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <div className="flex items-center gap-2">
                {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>High Contrast</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${highContrast ? 'bg-yellow-400' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${highContrast ? 'left-4.5' : 'left-0.5'}`} />
              </div>
            </button>

            {/* Font Size Controls */}
            <div className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                <span>Text Size</span>
              </div>
              <div className="flex gap-2">
                 <button onClick={decreaseFontSize} className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center font-bold hover:opacity-80">A-</button>
                 <button onClick={increaseFontSize} className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center font-bold hover:opacity-80">A+</button>
              </div>
            </div>

            {/* Voice Mode Toggle */}
            <button 
              onClick={toggleVoiceMode}
              className={`flex items-center justify-between text-sm p-2 rounded-lg transition ${voiceMode ? 'bg-emerald-100 text-emerald-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>Voice Mode</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${voiceMode ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
        aria-label="Open Accessibility Menu"
      >
        <Eye className="w-6 h-6" />
      </button>
    </div>
  );
}
