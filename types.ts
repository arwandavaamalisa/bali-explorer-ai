
export type Role = 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
  timestamp: Date;
}

export interface Recommendation {
  title: string;
  location: string;
  image: string;
  category: 'Beach' | 'Temple' | 'Nature' | 'Food';
}
