export interface User {
  id: string;
  username: string;
  preferredTopics: string[];
  difficultyLevel: 'easy' | 'medium' | 'hard';
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface AuthState {
  user: User | null;
  status: AuthStatus;
  token: string | null;
}

export type ContentType = 'article' | 'video' | 'exercise' | 'quiz' | 'game';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type ContentTopic = 
  | 'learning_disabilities' 
  | 'reading_strategies' 
  | 'phonological_awareness' 
  | 'auditory_processing' 
  | 'reading_comprehension' 
  | 'assistive_technology';

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  topic: ContentTopic;
  difficulty: DifficultyLevel;
  description: string;
  ttsEnabled?: boolean;
  sttEnabled?: boolean;
  imageUrl?: string;
}

export interface Article extends Content {
  type: 'article';
  text: string;
}

export interface Video extends Content {
  type: 'video';
  url: string;
  duration: number;
}

export interface Exercise extends Content {
  type: 'exercise' | 'game';
  instructions: string;
}

export interface Quiz extends Content {
  type: 'quiz';
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Performance {
  timestamp: string;
  activity: string;
  score?: number;
  timeSpent?: number;
  completionRate?: number;
  difficultyLevel?: DifficultyLevel;
}

export interface AnalyticsReport {
  scores: {
    mean: number;
    min: number;
    max: number;
  };
  timeSpent: {
    mean: number;
    min: number;
    max: number;
  };
  completionRate: {
    mean: number;
    min: number;
    max: number;
  };
  progressOverTime: {
    date: string;
    score: number;
  }[];
}