import { firestore } from 'firebase';
import { OriginalFood } from './original-food';
import { AddedFood } from './added-food';

export interface Set {
  setId: string;
  userId: string;
  setTitle: string;
  meal: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  foodsArray?: { setId: string; food: FoodInArray }[];
  setCal: number;
  setProtein: number;
  setFat: number;
  setTotalCarbohydrate: number;
  setDietaryFiber: number;
  setSugar: number;
  updatedAt: firestore.Timestamp;
}

interface FoodInArray {
  foodName: string;
  foodId?: string;
  recipeId?: string;
  amount: number;
}
