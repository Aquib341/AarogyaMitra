"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import ChatInterface from "@/components/chat/ChatInterface";
import HeroOrb from "@/components/ui/HeroOrb";
import AccessibilityControls from "@/components/ui/AccessibilityControls";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <AccessibilityControls />
      
      {/* 3D Hero Element (Background) */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <HeroOrb />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-8">
        
        {/* Hero Text */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Trusted Health Guidance. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">
              In Your Language.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Verified, multilingual health information with humans always in the loop.
          </p>
        </motion.div>

      {/* Chat Interface */}
        <ChatInterface />
        
        {/* Navigation Features */}
        <div className="flex gap-4 mt-8">
            <Link href="/vision" className="px-6 py-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-zinc-700 dark:text-gray-200">
                <span>📷 Vision Assistant</span>
            </Link>
        </div>
      </div>
    </div>
  );
}
