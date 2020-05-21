import { User } from './user';

export interface DailyInfo {
  dailyId: string;
  date: string;
  currentWeight: number;
  currentFat: number;
  breakfast: number;
  lunch: number;
  dener: number;
  dailyMemo: string;
  authorId: string;
}

interface UserWithAuthor extends User {
  author: User;
}
