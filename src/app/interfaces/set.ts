import { firestore } from 'firebase';

export interface Set {
  setId: string;
  userId: string;
  setTitle: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  foodsArray?: FoodInArray[];
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
  foodCalPerAmount: number;
  unit: 'amount' | 'g' | 'ml';
  foodProtein: number;
  foodFat: number;
  foodTotalCarbohydrate: number;
  foodSugar: number;
  foodDietaryFiber: number;
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

export interface FoodInArray {
  foodId: string;
  foodName: string;
  foodCalPerAmount: number;
  foodProtein: number;
  foodFat: number;
  foodTotalCarbohydrate: number;
  foodSugar: number;
  foodDietaryFiber: number;

  recipeId: string;
  recipeTitle: string;

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
  amount: number;
}
export interface Meal {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}
