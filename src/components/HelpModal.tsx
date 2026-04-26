import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, MessageCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-600">
              <h2 className="text-xl font-black text-white tracking-tight">Bantuan & Dukungan</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-6 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 scale-110 animate-pulse">
                <Heart className="w-10 h-10 text-red-500 fill-current" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 leading-tight">
                  Dukung ELLENTPresent
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  "Abis Menggunakan Jangan Jupa Donasi Dana ke Nomer <a href="https://wa.me/6282279088423" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">082279088423</a> "
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="https://wa.me/6282279088423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-200 hover:bg-green-600 hover:-translate-y-1 transition-all active:scale-95 group"
                >
                  <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Kirim Donasi (DANA)
                </a>
              </div>

              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-4">
                Terima kasih atas dukungannya!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
