export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LessonSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string; // Markdown supported
  technicalSpecs?: Record<string, string>;
  tips?: string[];
  warnings?: string[];
}

export interface ManualModule {
  id: string;
  title: string;
  iconName: string; // lucide icon name
  description: string;
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

export interface PresetData {
  name: string;
  category: string;
  character: string[];
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface UserProgress {
  completedModules: string[]; // module ids
  moduleQuizScores: Record<string, number>; // module id -> high score percentage
  totalPoints: number;
  unlockedBadges: string[];
  notes: Record<string, string>; // sectionId -> user notes text
}
