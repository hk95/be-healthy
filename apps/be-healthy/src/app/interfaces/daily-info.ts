import { Food } from './food';
import { Set } from './set';

export interface DailyInfo {
  dailyId: string;
  date: string;
  currentWeight: number;
  currentFat: number;
  dailyMemo: string;
  authorId: string;
  totalCal?: number;
  breakfastCal?: number;
  lunchCal?: number;
  dinnerCal?: number;
}

export interface DailyMeal {
  mealId: string;
  food?: Food;
  set?: Set;
  amount: number;
}

export interface DailyInfoList {
  list: { [n: number]: DailyInfo };
  dateOfPath: string;
}
