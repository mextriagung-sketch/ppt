import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, GraduationCap, Microscope, Calculator, Globe } from 'lucide-react';
import { EducationLevel } from '../types';

interface Template {
  id: string;
  level: EducationLevel;
  subject: string;
  topic: string;
  className: string;
  icon: React.ReactNode;
  color: string;
}

const TEMPLATES: Template[] = [
  // SD
  {
    id: 'sd-1',
    level: 'SD',
    subject: 'IPA',
    topic: 'Metamorfosis Sempurna: Daur Hidup Kupu-kupu',
    className: '4',
    icon: <Microscope className="w-5 h-5" />,
    color: 'bg-green-50 text-green-600 border-green-100'
  },
  {
    id: 'sd-2',
    level: 'SD',
    subject: 'IPAS',
    topic: 'Sistem Tata Surya: Mengenal Planet di Galaksi Bima Sakti',
    className: '6',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  },
  // SMP
  {
    id: 'smp-1',
    level: 'SMP',
    subject: 'Sejarah',
    topic: 'Peristiwa Rengasdengklok dan Proklamasi',
    className: '9',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-red-50 text-red-600 border-red-100'
  },
  {
    id: 'smp-2',
    level: 'SMP',
    subject: 'Matematika',
    topic: 'Memahami Rumus Pythagoras dalam Kehidupan Nyata',
    className: '8',
    icon: <Calculator className="w-5 h-5" />,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  },
  // SMA
  {
    id: 'sma-1',
    level: 'SMA',
    subject: 'Fisika',
    topic: 'Hukum Termodinamika dan Mesin Kalor',
    className: '11 IPA',
    icon: <Calculator className="w-5 h-5" />,
    color: 'bg-orange-50 text-orange-600 border-orange-100'
  },
  {
    id: 'sma-2',
    level: 'SMA',
    subject: 'Sosiologi',
    topic: 'Dampak Perubahan Sosial di Masyarakat Digital',
    className: '12 IPS',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
  },
  // SMK
  {
    id: 'smk-1',
    level: 'SMK',
    subject: 'Otomotif (TKR)',
    topic: 'Analisis Cara Kerja Sistem Injeksi Bahan Bakar',
    className: '12 TKR',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'bg-slate-50 text-slate-600 border-slate-100'
  },
  {
    id: 'smk-2',
    level: 'SMK',
    subject: 'Multimedia/DKV',
    topic: 'Prinsip Dasar Tipografi dalam Desain Grafis',
    className: '11 DKV',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-pink-50 text-pink-600 border-pink-100'
  },
  {
    id: 'smk-3',
    level: 'SMK',
    subject: 'Kesehatan/Farmasi',
    topic: 'Pengenalan Tanaman Obat dan Simplisia',
    className: '10 Farmasi',
    icon: <Microscope className="w-5 h-5" />,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  },
  // KULIAH
  {
    id: 'ku-1',
    level: 'Kuliah',
    subject: 'Teknik Informatika',
    topic: 'Penerapan Machine Learning dalam Analisis Data Big Data',
    className: 'Semester 5',
    icon: <Calculator className="w-5 h-5" />,
    color: 'bg-violet-50 text-violet-600 border-violet-100'
  },
  {
    id: 'ku-2',
    level: 'Kuliah',
    subject: 'Hukum',
    topic: 'Perbandingan Sistem Hukum Perdata di Indonesia',
    className: 'Semester 3',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  },
  {
    id: 'ku-3',
    level: 'Kuliah',
    subject: 'Ekonomi',
    topic: 'Kebijakan Fiskal di Masa Krisis Global',
    className: 'Semester 7',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-sky-50 text-sky-600 border-sky-100'
  }
];

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (temp: Template) => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose, onSelect }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Template Konten</h2>
                <p className="text-gray-500 text-sm">Pilih topik populer untuk memulai dengan cepat.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelect(t);
                    onClose();
                  }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-95 ${t.color}`}
                >
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    {t.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      {t.level} • {t.subject}
                    </div>
                    <div className="font-bold text-sm mt-1 leading-tight">{t.topic}</div>
                    <div className="text-[10px] mt-2 font-medium">Contoh: Kelas {t.className}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 font-medium italic">
                Tips: Anda selalu bisa mengubah detailnya setelah memilih template.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
