import { User } from './user';
import { DailyInfoService } from '../services/daily-info.service';
import { OriginalFood } from './original-food';

export interface DailyInfo {
  dailyId: string;
  date: string;
  currentWeight: number;
  currentFat: number;
  breakfast: Breakfast;
  lunch: number;
  dinner: number;
  dailyMemo: string;
  authorId: string;
}

export interface Breakfast {
  breakfastId: string;
  foodId: string;
  amount: number;
}

export interface BreakfastWithMeal extends Breakfast {
  meal: OriginalFood;
}
