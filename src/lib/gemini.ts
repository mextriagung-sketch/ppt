import { GoogleGenAI, Type } from "@google/genai";
import { PresentationData, EducationLevel } from "../types";
import { ThemePalette } from "../constants";

let apiKey = process.env.GEMINI_API_KEY || (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY);
let ai = new GoogleGenAI({ apiKey: apiKey || "dummy" });

export function setApiKey(newKey: string) {
  apiKey = newKey;
  ai = new GoogleGenAI({ apiKey: newKey });
}

export async function generatePresentationContent(
  level: EducationLevel,
  className: string,
  subject: string,
  topic: string,
  slideCount: number,
  themeOverride?: ThemePalette
): Promise<PresentationData> {
  const prompt = `Buatlah konten presentasi untuk sekolah dengan detail berikut:
  - Jenjang: ${level}
  - Kelas: ${className}
  - Mata Pelajaran: ${subject}
  - Topik: ${topic}
  - Jumlah Slide: ${slideCount}
  ${themeOverride ? `- Gunakan tema warna: ${themeOverride.name} (${themeOverride.primary}, ${themeOverride.secondary}, ${themeOverride.accent})` : ''}

   Berikan respons dalam format JSON yang berisi:
  - title: Judul presentasi yang menarik.
  - subtitle: Subjudul atau deskripsi singkat.
  - slides: Array objek slide (title: string, points: string[] berisi 3-5 poin, visualPrompt: deskripsi singkat ilustrasi, teacherNotes: penjabaran detail dari judul dan poin-poin tersebut untuk membantu guru menjelaskan materi).
  - theme: Objek berisi primaryColor, secondaryColor, accentColor dalam format hex, dan fontFamily (sans-serif, serif, atau monospace).

  Konten harus sesuai dengan tingkat pemahaman anak sekolah di jenjang tersebut (${level}). Gunakan Bahasa Indonesia yang baik dan mudah dimengerti.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                points: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                visualPrompt: { type: Type.STRING },
                teacherNotes: { type: Type.STRING }
              },
              required: ["title", "points", "teacherNotes"]
            }
          },
          theme: {
            type: Type.OBJECT,
            properties: {
              primaryColor: { type: Type.STRING },
              secondaryColor: { type: Type.STRING },
              accentColor: { type: Type.STRING },
              fontFamily: { type: Type.STRING }
            },
            required: ["primaryColor", "secondaryColor", "accentColor", "fontFamily"]
          }
        },
        required: ["title", "subtitle", "slides", "theme"]
      }
    }
  });

  const content = JSON.parse(response.text || "{}");
  
  // If we have a theme override, enforce it even if AI suggests something else
  if (themeOverride) {
    content.theme = {
      primaryColor: themeOverride.primary,
      secondaryColor: themeOverride.secondary,
      accentColor: themeOverride.accent,
      fontFamily: themeOverride.font
    };
  }
  
  return {
    ...content,
    level,
    className,
    subject,
    topic
  } as PresentationData;
}
