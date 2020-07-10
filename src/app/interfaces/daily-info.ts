import { Food } from './food';
import { Set } from './set';

export interface DailyInfo {
  dailyId: string;
  date: string;
  currentWeight: number;
  currentFat: number;
  breakfast: DailyMeal;
  lunch: number;
  dinner: number;
  dailyMemo: string;
  authorId: string;
}

export interface DailyMeal {
  mealId: string;
  food?: Food;
  setId?: string;
  amount: number;
}

export interface DailyMealWithSet extends DailyMeal {
  set?: Set;
}
