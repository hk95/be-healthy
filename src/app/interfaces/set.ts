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

export interface FoodOrRecipe {
  foodId: string;
  foodName: string;
  calPerAmount: number;
  unit: 'amount' | 'g' | 'ml';
  protein: number;
  foodFat: number;
  totalCarbohydrate: number;
  sugar: number;
  dietaryFiber: number;
  isLiked?: boolean;
  recipeId: string;
  recipeTitle: string;
  recipeThumbnailURL?: string;
  recipeDescription?: string;
  recipeCal?: number;
  recipeProtein?: number;
  recipeFat?: number;
  recipeTotalCarbohydrate?: number;
  recipeDietaryFiber?: number;
  recipeSugar?: number;
  foods: [{ name: string; amountAndUnit: string }];
  processes?: [{ photoURL: string; description: string }];
  public: boolean;
  authorId: string;
  updatedAt: firestore.Timestamp;
}

interface FoodInArray {
  foodName: string;
  foodId?: string;
  recipeId?: string;
  amount: number;
}
