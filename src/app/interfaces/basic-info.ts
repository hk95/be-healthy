import { User } from './user';

export interface BasicInfo {
  userName: string;
  gender: 'male' | 'female' | 'other';
  height: number;
  goalWeight: number;
  goalFat: number;
  goalCal: number;
  authorId: string;
}

interface UserWithAuthor extends User {
  author: User;
}
