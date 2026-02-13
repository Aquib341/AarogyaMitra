"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronDown, CheckCircle } from 'lucide-react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string | null;
  isAlert?: boolean;
}

export default function MessageBubble({ role, content, imageUrl, isAlert }: MessageBubbleProps) {
  const [showSource, setShowSource] = useState(false);

  // Mock Source Data
  const source = {
    name: "World Health Organization (WHO)",
    date: "Oct 2025",
    verified: true
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full ${role === 'user' ? 'justify-end' : 'justify-start'} mb-6 group`}
    >
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%]`}>
        <div className={`rounded-2xl px-5 py-3.5 shadow-sm relative overflow-hidden transition-shadow hover:shadow-md ${
          role === 'user' 
            ? 'bg-emerald-600 text-white rounded-br-none' 
            : isAlert 
              ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-2 border-red-500 rounded-bl-none'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700'
        }`}>
          {/* Visual Response */}
          {imageUrl && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mb-3 rounded-xl overflow-hidden shadow-sm"
            >
              <img src={imageUrl} alt="Health diagram" className="w-full h-auto object-cover max-h-48" />
            </motion.div>
          )}

          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{content}</p>
          
          {role === 'assistant' && (
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => setShowSource(!showSource)}
                className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-slate-400 hover:text-emerald-600 transition-colors"
                aria-label={showSource ? "Hide sources" : "Show sources"}
              >
                {showSource ? 'Hide Sources' : 'Show Sources'}
                <ChevronDown className={`w-3 h-3 transition-transform ${showSource ? 'rotate-180' : ''}`} />
              </button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-emerald-600 transition-colors" 
                title="Play Audio"
              >
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Source Panel */}
        <AnimatePresence>
          {role === 'assistant' && showSource && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 ml-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-3 text-xs text-slate-500">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{source.name}</span>
                  {source.verified && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <p>Last updated: {source.date}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
