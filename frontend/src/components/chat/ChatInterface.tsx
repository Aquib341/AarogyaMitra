"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe } from 'lucide-react';
import MessageBubble from './MessageBubble';
import RiskModal from '../ui/RiskModal';
import VoiceInput from './VoiceInput';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  isAlert?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Namaste! I am AarogyaMitra, your AI Health Companion. I can provide verified medical information to guide you. How can I help you regarding your health today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [lastInputSource, setLastInputSource] = useState<'text' | 'voice'>('text');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Risk Detection (Simple Keyword Match for Demo)
  useEffect(() => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
      const riskKeywords = ['suicide', 'kill myself', 'die', 'hurt myself', 'end it all'];
      if (riskKeywords.some(keyword => lastUserMessage.content.toLowerCase().includes(keyword))) {
        setIsRiskModalOpen(true);
      }
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage].map(m => ({ role: m.role, content: m.content })),
          language: language
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I'm having trouble connecting to the server.",
        imageUrl: data.image_url,
        isAlert: data.alert // Capture alert flag from backend
      };
      
      setMessages(prev => [...prev, responseMessage]);

      // TTS Logic: Speak the response if available AND if input was voice
      if (lastInputSource === 'voice') {
        speakResponse(responseMessage.content, language);
      }

    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I am unable to connect to the server right now. Please ensure the backend is running."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text: string, lang: string) => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language codes to BCP 47 tags (approximate)
    const langMap: Record<string, string> = {
      'en': 'en-IN', // Indian English preferred
      'hi': 'hi-IN',
      'mr': 'hi-IN', // Fallback to Hindi voice for Marathi if specific not found
      'bn': 'bn-IN',
      'ta': 'ta-IN',
      'es': 'es-ES',
      'fr': 'fr-FR'
    };

    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch

    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <RiskModal isOpen={isRiskModalOpen} onClose={() => setIsRiskModalOpen(false)} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-panel w-full max-w-3xl h-[85vh] sm:h-[80vh] flex flex-col relative overflow-hidden shadow-2xl border-white/40 dark:border-slate-700/50 mx-auto"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-100/50 dark:border-slate-700/50 px-4 sm:px-6 py-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20 shrink-0">
              AM
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-none">
                AarogyaMitra
              </h1>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-teal-600 dark:text-teal-400 mt-0.5">Verified Health AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="relative group">
                <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="pl-8 pr-8 py-1.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-full text-xs sm:text-sm text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 appearance-none cursor-pointer hover:bg-white/80 transition-colors shadow-sm"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
             </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 overscroll-contain">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              role={msg.role} 
              content={msg.content} 
              imageUrl={msg.imageUrl}
              isAlert={msg.isAlert}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-4 bg-white/40 dark:bg-slate-900/40 border-t border-slate-100/50 dark:border-slate-700/50 backdrop-blur-md">
          <form onSubmit={handleSendMessage} className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center gap-2 bg-white dark:bg-slate-800 rounded-3xl p-1.5 pl-3 sm:pl-4 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-shadow focus-within:shadow-xl focus-within:ring-1 focus-within:ring-teal-500/30">
               <div className="flex-shrink-0">
                  <VoiceInput onTranscript={(text) => {
                    setInputValue(text);
                    setLastInputSource('voice');
                  }} />
               </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setLastInputSource('text');
                }}
                placeholder="Type your health question..."
                className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none py-2 text-sm sm:text-base min-w-0"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
            <p className="text-center text-[9px] sm:text-[10px] text-slate-400 mt-2 font-medium">
              AarogyaMitra provides info, not medical advice. Use for guidance only.
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
}
