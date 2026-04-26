import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface ApiKeyScreenProps {
  onKeySubmit: (key: string) => void;
}

export const ApiKeyScreen: React.FC<ApiKeyScreenProps> = ({ onKeySubmit }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim().length < 20) {
      setError('Silakan masukkan API Key yang valid');
      return;
    }
    onKeySubmit(key.trim());
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[32px] shadow-xl shadow-gray-200/50 p-8 md:p-12 space-y-8 border border-gray-100"
      >
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-6">
            <Key className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Selamat Datang!
          </h1>
          <p className="text-gray-500 leading-relaxed font-medium">
            Untuk memulai, silakan masukkan Gemini API Key Anda. Data ini hanya akan disimpan di browser Anda secara lokal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              GEMINI API KEY
            </label>
            <div className="relative">
              <input
                type="password"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  setError('');
                }}
                placeholder="AIzaSy..."
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none font-mono text-sm leading-relaxed"
              />
              {error && (
                <p className="text-red-500 text-xs font-bold mt-2 ml-1 animate-shake">
                  {error}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-[0.98] group"
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pt-6 border-t border-gray-100 space-y-4">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl text-blue-600 hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-500">
                <ExternalLink className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold">Dapatkan API Key Gratis</span>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </a>

          <div className="flex items-center gap-3 justify-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Focused & Secure</span>
          </div>
        </div>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
    </div>
  );
};
