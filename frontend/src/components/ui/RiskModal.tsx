"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, ExternalLink, X } from "lucide-react";

interface RiskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RiskModal({ isOpen, onClose }: RiskModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-amber-500/50">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 text-center border-b border-amber-100 dark:border-amber-900/10">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-gray-100">
                  You are not alone.
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">
                  It sounds like you might be going through a difficult time. support is available.
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col gap-3">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 font-medium text-white shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    <Phone className="h-5 w-5" />
                    Call National Helpline
                  </button>
                  
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-4 py-3 font-medium text-slate-700 dark:text-gray-200 transition-colors hover:bg-slate-50 dark:hover:bg-slate-600">
                    <ExternalLink className="h-5 w-5" />
                    Contact Campus Clinic
                  </button>
                  
                  <button 
                    onClick={onClose}
                    className="mt-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    I'm okay, let me continue reading
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
