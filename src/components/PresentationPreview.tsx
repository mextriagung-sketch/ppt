import React, { useState } from 'react';
import { PresentationData } from '../types';
import { Download, ChevronLeft, ChevronRight, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import pptxgen from "pptxgenjs";
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface PresentationPreviewProps {
  data: PresentationData;
}

export const PresentationPreview: React.FC<PresentationPreviewProps> = ({ data }) => {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const [transitionType, setTransitionType] = useState<'slide' | 'fade' | 'zoom'>('slide');
  const [showNotes, setShowNotes] = useState(false);

  const paginate = (newDirection: number) => {
    const nextSlide = currentSlide + newDirection;
    if (nextSlide >= 0 && nextSlide < slides.length) {
      setSlide([nextSlide, newDirection]);
    }
  };

  const getVariants = () => {
    switch (transitionType) {
      case 'fade':
        return {
          enter: { opacity: 0, filter: 'blur(10px)' },
          center: { opacity: 1, filter: 'blur(0px)', x: 0, scale: 1 },
          exit: { opacity: 0, filter: 'blur(10px)' }
        };
      case 'zoom':
        return {
          enter: { scale: 0.9, opacity: 0 },
          center: { scale: 1, opacity: 1, x: 0, filter: 'blur(0px)' },
          exit: { scale: 1.1, opacity: 0 }
        };
      default: // slide
        return {
          enter: (direction: number) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0,
            scale: 0.98
          }),
          center: {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
          },
          exit: (direction: number) => ({
            x: direction < 0 ? 200 : -200,
            opacity: 0,
            scale: 1.02
          })
        };
    }
  };

  const downloadPPT = () => {
    const pres = new pptxgen();
    
    // Define Master Slide for consistent theme
    pres.defineSlideMaster({
      title: "CONTENT_SLIDE",
      background: { fill: "F1F5F9" }, // Light slate background for all slides
      objects: [
        // Decorative shapes for theme consistency
        { rect: { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: data.theme.primaryColor } } },
        { rect: { x: 0, y: "98%", w: "100%", h: 0.02, fill: { color: data.theme.secondaryColor } } },
        { rect: { x: "90%", y: "85%", w: 0.5, h: 0.5, fill: { color: data.theme.accentColor } } }, // Replaced shape with rect
      ],
    });

    // Title Slide
    const titleSlide = pres.addSlide();
    titleSlide.background = { fill: data.theme.primaryColor };
    
    // Abstract background shapes for Title
    titleSlide.addShape(pres.ShapeType.rtTriangle, { x: "70%", y: 0, w: "30%", h: "40%", fill: { color: data.theme.secondaryColor, transparency: 50 }, flipH: true });
    titleSlide.addShape(pres.ShapeType.ellipse, { x: -1, y: "60%", w: 3, h: 3, fill: { color: data.theme.accentColor, transparency: 70 } });

    titleSlide.addText(data.title, {
      x: 0, y: "35%", w: "100%", h: 1,
      align: "center", fontSize: 40, color: "FFFFFF", bold: true,
      fontFace: data.theme.fontFamily === 'serif' ? 'Georgia' : 'Arial'
    });
    titleSlide.addText(data.subtitle, {
      x: 0, y: "50%", w: "100%", h: 0.5,
      align: "center", fontSize: 22, color: "FFFFFF",
      fontFace: data.theme.fontFamily === 'serif' ? 'Georgia' : 'Arial'
    });
    titleSlide.addText(`${data.subject} • Kelas ${data.className} • ${data.level}`, {
      x: 0, y: "85%", w: "100%", h: 0.5,
      align: "center", fontSize: 14, color: "FFFFFF"
    });

    // Content Slides
    data.slides.forEach((slide) => {
      const s = pres.addSlide({ masterName: "CONTENT_SLIDE" });
      
      s.addText(slide.title, {
        x: 0.5, y: 0.15, w: "90%", h: 0.5,
        fontSize: 28, color: "FFFFFF", bold: true
      });

      s.addText(slide.points.join("\n\n"), {
        x: 0.7, y: 1.5, w: 8.5, h: "70%",
        fontSize: 18, color: "363636", bullet: { type: 'number' },
        valign: "top"
      });

      if (slide.visualPrompt) {
        s.addText(`Tip Visual: ${slide.visualPrompt}`, {
          x: 0.5, y: "88%", w: "90%", h: 0.3,
          fontSize: 10, color: "888888", italic: true
        });
      }
    });

    pres.writeFile({ fileName: `${data.title.replace(/[^a-z0-9]/gi, '_')}.pptx` });
  };

  const slides = [
    { title: data.title, points: [data.subtitle, `${data.subject} - Kelas ${data.className}`], isTitle: true, teacherNotes: "Gunakan slide ini untuk menyapa siswa dan memperkenalkan topik hari ini. Sampaikan tujuan pembelajaran secara singkat." },
    ...data.slides
  ];

  const current = slides[currentSlide];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-12">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">{data.title}</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Animasi:</span>
            {(['slide', 'fade', 'zoom'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTransitionType(type)}
                className={cn(
                  "text-[10px] font-black uppercase px-2 py-0.5 rounded-md border transition-all",
                  transitionType === type 
                    ? "bg-blue-600 border-blue-600 text-white" 
                    : "bg-white border-gray-200 text-gray-400 hover:border-blue-300"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>
        <button
          onClick={downloadPPT}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:shadow-green-100 transition-all active:scale-95 shrink-0"
        >
          <Download className="w-5 h-5" />
          Download .PPTX
        </button>
      </div>

      <div className="relative aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-100 group">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={getVariants()}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full p-12 flex flex-col relative overflow-hidden"
            style={{ 
              backgroundColor: 'isTitle' in current ? data.theme.primaryColor : (current.visualPrompt?.toLowerCase().includes('gelap') ? '#1e293b' : `${data.theme.primaryColor}05`),
              color: current.visualPrompt?.toLowerCase().includes('gelap') ? 'white' : 'inherit',
              fontFamily: data.theme.fontFamily === 'serif' ? 'Playfair Display, serif' : 'Inter, sans-serif'
            }}
          >
            {/* Teacher Notes Overlay (Replaced AI Design Overlay) */}
            <AnimatePresence>
              {showNotes && current.teacherNotes && (
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  className="absolute top-0 right-0 h-full w-[320px] z-50 p-6"
                >
                  <div className="h-full bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl rounded-l-3xl flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Catatan Penjelasan</span>
                      </div>
                      <button 
                        onClick={() => setShowNotes(false)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto">
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {current.teacherNotes}
                      </p>
                      <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">Tips Guru:</span>
                        <p className="text-[11px] text-blue-600 leading-snug">
                          Gunakan poin-poin di layar sebagai panduan utama, lalu kembangkan dengan penjelasan di atas untuk membuat kelas lebih interaktif.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-bl-3xl">
                      <div className="text-[9px] text-gray-400 font-bold text-center uppercase tracking-widest">
                        AI Generated Teacher Assistant
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-40"
                style={{ backgroundColor: data.theme.secondaryColor }}
              />
              <motion.div 
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, -30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-40"
                style={{ backgroundColor: data.theme.accentColor }}
              />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              { 'isTitle' in current ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-white/10 p-5 rounded-[2.5rem] border border-white/20 inline-block mb-4 backdrop-blur-sm">
                      <FileText className="w-16 h-16" />
                    </div>
                    <h1 className="text-6xl font-black leading-tight drop-shadow-lg">{current.title}</h1>
                    <p className="text-2xl opacity-90 font-medium mt-4">{current.points[0]}</p>
                    <div className="mt-12 inline-block bg-white/20 px-8 py-3 rounded-2xl text-base font-bold backdrop-blur-md border border-white/10">
                      {current.points[1]}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <>
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="border-l-8 pl-6 mb-10" 
                    style={{ borderColor: data.theme.primaryColor }}
                  >
                    <h2 className={cn(
                      "text-5xl font-black tracking-tight",
                      current.visualPrompt?.toLowerCase().includes('gelap') ? "text-white" : "text-gray-800"
                    )}>{current.title}</h2>
                  </motion.div>
                  <ul className="flex-1 space-y-5">
                    {current.points.map((p, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className={cn(
                          "text-2xl flex items-start gap-5 group/item",
                          current.visualPrompt?.toLowerCase().includes('gelap') ? "text-gray-200" : "text-gray-600"
                        )}
                      >
                        <div 
                          className="mt-2.5 w-4 h-4 rounded-full shrink-0 shadow-sm transition-transform group-hover/item:scale-125" 
                          style={{ backgroundColor: data.theme.primaryColor }} 
                        />
                        <span className="font-medium leading-relaxed">{p}</span>
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg text-white hover:bg-white/20 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="w-[1px] h-6 bg-white/20" />
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all",
              showNotes ? "bg-blue-600 text-white" : "text-white hover:bg-white/10"
            )}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-tighter">Penjelasan</span>
          </button>
          <div className="w-[1px] h-6 bg-white/20" />
          <div className="flex items-center gap-2 min-w-[80px] justify-center">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  currentSlide === i ? "w-6 bg-white" : "w-1.5 bg-white/40"
                )} 
              />
            ))}
          </div>
          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-lg text-white hover:bg-white/20 disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
