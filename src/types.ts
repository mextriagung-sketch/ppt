export type EducationLevel = 'SD' | 'SMP' | 'SMA' | 'SMK' | 'Kuliah';

export interface SlideContent {
  title: string;
  points: string[];
  visualPrompt?: string; // AI description of what image/graphic should be here
  teacherNotes?: string; // Detailed explanation for teachers
}

export interface PresentationData {
  title: string;
  subtitle: string;
  level: EducationLevel;
  className: string;
  subject: string;
  topic: string;
  slides: SlideContent[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
}
