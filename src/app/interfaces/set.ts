import { firestore } from 'firebase/compat';
import { Food } from './food';
import { Recipe } from './recipe';

export interface Set {
  setId: string;
  userId: string;
  setTitle: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  setCal: number;
  setProtein: number;
  setFat: number;
  setTotalCarbohydrate: number;
  setDietaryFiber: number;
  setSugar: number;
  updatedAt: firestore.Timestamp;
  foodsArray?: FoodInArray[];
}

export interface FoodInArray {
  food?: Food;
  recipe?: Recipe;
  amount: number;
}
export interface Meal {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

export interface Nutrition {
  currentCal: number;
  currentProtein: number;
  currentFat: number;
  currentTotalCarbohydrate: number;
  currentSugar: number;
  currentDietaryFiber: number;
}
