import React, { useState, useEffect } from 'react';
import { EducationLevel } from '../types';
import { GraduationCap, BookOpen, Layers, Type as TypeIcon, Hash, Loader2, Sparkles, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { THEME_PALETTES, ThemePalette, EDUCATION_LEVELS, CURRICULUM_TOPICS } from '../constants';

interface PresentationFormProps {
  onGenerate: (data: {
    level: EducationLevel;
    className: string;
    subject: string;
    topic: string;
    slideCount: number;
    theme?: ThemePalette;
  }) => void;
  isLoading: boolean;
  templateData?: any;
  clearTemplate?: () => void;
}

export const PresentationForm: React.FC<PresentationFormProps> = ({ onGenerate, isLoading, templateData, clearTemplate }) => {
  const [level, setLevel] = useState<EducationLevel>('SMA');
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [selectedTheme, setSelectedTheme] = useState<ThemePalette | undefined>(undefined);
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [customColors, setCustomColors] = useState({
    primary: '#2563eb',
    secondary: '#1e3a8a',
    accent: '#60a5fa',
    font: 'sans-serif' as const
  });

  // Curriculum logic
  const getCurriculumSuggestions = () => {
    if (!level || !subject) return [];
    
    // Normalize subject string to find match
    const levelData = CURRICULUM_TOPICS[level];
    if (!levelData) return [];
    
    const matchedSubject = Object.keys(levelData).find(s => 
      subject.toLowerCase().includes(s.toLowerCase()) || 
      s.toLowerCase().includes(subject.toLowerCase())
    );
    
    return matchedSubject ? levelData[matchedSubject] : [];
  };

  const suggestions = getCurriculumSuggestions();

  // Watch for template changes
  useEffect(() => {
    if (templateData) {
      setLevel(templateData.level);
      setClassName(templateData.className);
      setSubject(templateData.subject);
      setTopic(templateData.topic);
      if (clearTemplate) clearTemplate();
    }
  }, [templateData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className || !subject || !topic) return;
    
    const theme = isCustomTheme ? {
      id: 'custom',
      name: 'Custom',
      ...customColors
    } : selectedTheme;

    onGenerate({ level, className, subject, topic, slideCount, theme });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8 max-w-3xl mx-auto"
    >
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
          <Sparkles className="w-6 h-6 text-blue-500" />
          Rancang Presentasi Anda
        </h2>
        <p className="text-gray-500 text-sm">
          Ayo isi detailnya! AI akan bekerja lebih baik jika topik Anda spesifik sesuai Kurikulum Merdeka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Basic Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              Jenjang Pendidikan
            </label>
            <div className="flex flex-wrap gap-2">
              {EDUCATION_LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={cn(
                    "py-2 px-4 rounded-xl border text-sm font-medium transition-all grow md:grow-0",
                    level === l
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                      : "bg-white border-gray-200 text-gray-600 hover:border-blue-300"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              Kelas
            </label>
            <input
              type="text"
              required
              placeholder="Misalnya: 9 atau 10 IPA 1"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Mata Pelajaran
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Informatika, IPA, Sejarah"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300 shadow-sm"
            />
            {/* Quick Subject Tabs */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {CURRICULUM_TOPICS[level] && Object.keys(CURRICULUM_TOPICS[level]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={cn(
                    "text-[9px] font-bold px-2 py-0.5 rounded-md border transition-all",
                    subject.toLowerCase() === s.toLowerCase()
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-200 text-gray-400 hover:border-blue-300"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Content & Theme */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TypeIcon className="w-4 h-4 text-blue-500" />
              Apa Topik Utamanya?
            </label>
            <input
              type="text"
              required
              placeholder="Ketik topik atau pilih elemen di bawah..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300 shadow-sm"
            />
            
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 overflow-hidden bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Elemen Kurikulum Merdeka
                    </label>
                    <span className="text-[9px] text-blue-400 font-bold">{level} • {subject}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTopic(s)}
                        className={cn(
                          "text-[10px] py-1.5 px-3 rounded-xl border transition-all text-left group relative",
                          topic === s 
                            ? "bg-blue-600 border-blue-600 text-white font-bold shadow-lg shadow-blue-100" 
                            : "bg-white border-gray-100 text-gray-600 hover:border-blue-200 hover:text-blue-500"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center justify-between mb-2">
                <span className="flex items-center gap-2"><Hash className="w-4 h-4 text-blue-500" />Slide</span>
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">{slideCount}</span>
              </label>
              <input
                type="range"
                min="3"
                max="15"
                step="1"
                value={slideCount}
                onChange={(e) => setSlideCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-blue-500" />
                Tema
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomTheme(false);
                    setSelectedTheme(undefined);
                  }}
                  className={cn(
                    "flex-1 py-2 rounded-xl border text-[10px] font-bold transition-all",
                    (!isCustomTheme && !selectedTheme)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  )}
                >
                  AUTO
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomTheme(true)}
                  className={cn(
                    "flex-1 py-2 rounded-xl border text-[10px] font-bold transition-all flex items-center justify-center gap-1",
                    isCustomTheme
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  )}
                >
                  <Palette className="w-3 h-3" />
                  KUSTOM
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {!isCustomTheme ? (
              <div className="grid grid-cols-6 gap-2">
                {THEME_PALETTES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    className={cn(
                      "aspect-square rounded-xl border transition-all flex items-center justify-center relative overflow-hidden",
                      selectedTheme?.id === theme.id
                        ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                        : "border-gray-200 hover:border-blue-300"
                    )}
                    title={theme.name}
                  >
                    <div className="w-full h-full flex flex-col">
                      <div className="h-2/3 w-full" style={{ backgroundColor: theme.primary }} />
                      <div className="h-1/3 w-full flex">
                        <div className="w-1/2 h-full" style={{ backgroundColor: theme.secondary }} />
                        <div className="w-1/2 h-full" style={{ backgroundColor: theme.accent }} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-4"
              >
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-purple-600 block">UTAMA</span>
                    <input 
                      type="color" 
                      value={customColors.primary}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, primary: e.target.value }))}
                      className="w-full h-8 cursor-pointer rounded-lg border-none bg-transparent"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-purple-600 block">KEDUA</span>
                    <input 
                      type="color" 
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, secondary: e.target.value }))}
                      className="w-full h-8 cursor-pointer rounded-lg border-none bg-transparent"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-purple-600 block">AKSEN</span>
                    <input 
                      type="color" 
                      value={customColors.accent}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, accent: e.target.value }))}
                      className="w-full h-8 cursor-pointer rounded-lg border-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-purple-600 block">FONT</span>
                  <select
                    value={customColors.font}
                    onChange={(e) => setCustomColors(prev => ({ ...prev, font: e.target.value as any }))}
                    className="w-full bg-white border border-purple-200 rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-purple-400 outline-none"
                  >
                    <option value="sans-serif">Modern (Sans)</option>
                    <option value="serif">Elegan (Serif)</option>
                    <option value="monospace">Teknis (Mono)</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>


      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-5 rounded-3xl font-black text-lg text-white shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3",
          isLoading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 translate-y-0 hover:-translate-y-1"
        )}
      >
        {isLoading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Loader2 className="w-6 h-6" />
            </motion.div>
            Sedang Meracik Materi...
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            Generate Presentasi Sekarang
          </>
        )}
      </button>

      <p className="text-center text-[10px] text-gray-400 font-medium">
        Kualitas presentasi tergantung pada seberapa jelas topik yang Anda berikan.
      </p>
    </motion.form>
  );
};
