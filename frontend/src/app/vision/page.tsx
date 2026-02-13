import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import VisionComponent from '@/components/vision/VisionComponent';

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col items-center py-12 px-4 relative">
      <Link 
        href="/" 
        className="absolute top-6 left-6 p-2 rounded-full bg-white dark:bg-zinc-800 shadow-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-200"
      >
        <ArrowLeft size={24} />
      </Link>
      
      <div className="w-full max-w-4xl text-center space-y-4 mb-8 mt-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Visual Assistant</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Point your camera at objects or text to hear a description.
        </p>
      </div>
      <VisionComponent />
    </div>
  );
}
