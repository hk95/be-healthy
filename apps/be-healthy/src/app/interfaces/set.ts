import { firestore } from 'firebase';
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
