export interface Reminder {
  id: string;
  title: string;
  description: string;
  category: ReminderCategory;
  time: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  completed?: boolean;
  priority: 'low' | 'medium' | 'high';
  icon: string;
  emotionalTone: 'encouraging' | 'gentle' | 'celebratory' | 'neutral';
}

export type ReminderCategory = 
  | 'physiological'
  | 'safety'
  | 'love-belonging'
  | 'esteem'
  | 'self-actualization';

export interface UserProfile {
  id: string;
  name: string;
  type: 'independent' | 'family-supported' | 'limited-mobility' | 'active';
  preferences: {
    fontSize: 'normal' | 'large' | 'extra-large';
    voiceEnabled: boolean;
    notifications: boolean;
    caregiverAccess: boolean;
  };
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface CaregiverNote {
  id: string;
  message: string;
  timestamp: string;
  type: 'reminder' | 'encouragement' | 'check-in';
}

// API Types for development section
export interface StringInput {
  text: string;
}

export interface TaskData {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
}