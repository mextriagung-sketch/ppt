/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PresentationForm } from './components/PresentationForm';
import { PresentationPreview } from './components/PresentationPreview';
import { TemplateModal } from './components/TemplateModal';
import { HelpModal } from './components/HelpModal';
import { ApiKeyScreen } from './components/ApiKeyScreen';
import { generatePresentationContent, setApiKey } from './lib/gemini';
import { PresentationData, EducationLevel } from './types';
import { Sparkles, GraduationCap, History, ArrowLeft, Lightbulb, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemePalette } from './constants';

export default function App() {
  const [data, setData] = useState<PresentationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<PresentationData[]>([]);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [templateData, setTemplateData] = useState<any>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    const envKey = process.env.GEMINI_API_KEY || (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY);
    
    if (envKey) {
      setApiKey(envKey);
      setHasApiKey(true);
    } else if (storedKey) {
      setApiKey(storedKey);
      setHasApiKey(true);
    } else {
      setHasApiKey(false);
    }
  }, []);

  const handleKeySubmit = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setHasApiKey(true);
  };

  const handleResetKey = () => {
    localStorage.removeItem('gemini_api_key');
    window.location.reload();
  };

  const handleGenerate = async (params: {
    level: EducationLevel;
    className: string;
    subject: string;
    topic: string;
    slideCount: number;
    theme?: ThemePalette;
  }) => {
    setIsLoading(true);
    try {
      const result = await generatePresentationContent(
        params.level,
        params.className,
        params.subject,
        params.topic,
        params.slideCount,
        params.theme
      );
      setData(result);
      setHistory(prev => [result, ...prev].slice(0, 5));
    } catch (error) {
      console.error("Failed to generate:", error);
      alert("Maaf, terjadi kesalahan saat menyusun materi. Periksa API Key Anda atau kuota Gemini Anda.");
      if (error instanceof Error && error.message.includes('API_KEY_INVALID')) {
        handleResetKey();
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (hasApiKey === null) return null; // Loading state

  if (!hasApiKey) {
    return <ApiKeyScreen onKeySubmit={handleKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      <TemplateModal 
        isOpen={isTemplateModalOpen} 
        onClose={() => setIsTemplateModalOpen(false)} 
        onSelect={(t) => setTemplateData(t)} 
      />
      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
      />
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setData(null)}>
            <div className="bg-blue-600 p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-blue-600">ELLENTPresent</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-sm font-bold text-gray-500">
              <span 
                className="hover:text-blue-600 cursor-pointer whitespace-nowrap"
                onClick={() => setIsTemplateModalOpen(true)}
              >
                Template
              </span>
              <button
                className="hover:text-blue-600 cursor-pointer text-red-500 flex items-center gap-1 bg-transparent border-none p-0 whitespace-nowrap outline-none"
                onClick={handleResetKey}
              >
                <Key className="w-3 h-3" />
                Ganti Key
              </button>
              <span 
                className="hover:text-blue-600 cursor-pointer whitespace-nowrap"
                onClick={() => setIsHelpModalOpen(true)}
              >
                Bantuan
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <AnimatePresence mode="wait">
          {!data ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider"
                >
                  <Sparkles className="w-3 h-3" />
                  Didukung oleh Gemini 3 
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                  Buat Presentasi Sekolah <span className="text-blue-600">Dalam Sekejap.</span>
                </h1>
                <p className="text-xl text-gray-500 leading-relaxed">
                  Masukkan jenjang, kelas, dan topik pelajaranmu. AI akan menyusunkan struktur, 
                  materi slide, dan tema desain yang siap unduh ke PowerPoint.
                </p>
              </div>

              <PresentationForm 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
                templateData={templateData}
                clearTemplate={() => setTemplateData(null)}
              />

              {/* History / Features section */}
              {history.length > 0 && (
                <div className="pt-12 space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-400" />
                    Terakhir Dibuat
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {history.map((h, i) => (
                      <div 
                        key={i} 
                        onClick={() => setData(h)}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 group"
                      >
                        <div className="text-xs font-bold text-blue-500 mb-2">{h.subject}</div>
                        <h4 className="font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">{h.title}</h4>
                        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                          <span>{h.className}</span>
                          <span>{h.slides.length} Slides</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 flex gap-6">
                  <div className="bg-yellow-50 p-4 rounded-2xl shrink-0 h-fit">
                    <Lightbulb className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">Tips Topik Spesifik</h4>
                    <p className="text-gray-500 text-sm">
                      Gunakan topik yang lebih spesifik untuk hasil terbaik. Misalnya "Pertempuran 10 November Surabaya"
                      daripada hanya "Sejarah Indonesia".
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 flex gap-6">
                  <div className="bg-green-50 p-4 rounded-2xl shrink-0 h-fit">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">Tema Otomatis</h4>
                    <p className="text-gray-500 text-sm">
                      AI kami akan memilihkan warna dan font yang sesuai dengan subjek mata pelajaranmu secara otomatis.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <button
                onClick={() => setData(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Pengaturan
              </button>
              <PresentationPreview data={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 py-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 opacity-50">
            <GraduationCap className="w-5 h-5" />
            <span className="font-bold text-lg">ELLENTPresent</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Gunakan alat ini untuk membantu riset materi presentasi. Pastikan untuk selalu memeriksa kembali konten hasil AI sebelum dipresentasikan.
          </p>
          <div className="pt-6 text-gray-300 text-[10px] uppercase tracking-[0.2em] font-black">
            © 2026 ELLENTPresent AI • Bangga Melayani Pendidikan Indonesia
          </div>
        </div>
      </footer>
    </div>
  );
}

