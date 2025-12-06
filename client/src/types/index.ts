export interface User {
  _id: string;
  name: string;
  birthDate: string;
  birthTime?: string;
  gender?: 'male' | 'female' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface SajuReadingContent {
  fortuneLevel: string;
  fortuneDescription: string;
  advice: string;
  luckyColor?: string;
  luckyNumber?: number;
  warning?: string;
}

export interface SajuReading {
  _id: string;
  userId: string | User;
  type: 'today' | 'month' | 'life';
  content: SajuReadingContent;
  createdAt: string;
  expiresAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
}
