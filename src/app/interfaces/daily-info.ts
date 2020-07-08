import { Food } from './food';

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
  meal: Food;
}
