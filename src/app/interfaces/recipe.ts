import { firestore } from 'firebase';
import { BasicInfo } from './basic-info';

export interface Recipe {
  recipeId: string;
  recipeTitle: string;
  recipeThumbnailURL?: string;
  recipeDescription?: string;
  recipeCal: number;
  recipeProtein: number;
  recipeFat: number;
  recipeTotalCarbohydrate: number;
  recipeDietaryFiber: number;
  recipeSugar: number;
  public: boolean;
  authorId: string;
  updatedAt?: firestore.Timestamp;
  foods?: FoodOfRecipe[];
  processes?: ProcessOfRecipe[];
}
export interface FoodOfRecipe {
  name: string;
  amountAndUnit: string;
}
export interface ProcessOfRecipe {
  photoURL: string;
  description: string;
}

export interface RecipeWithAuthor extends Recipe {
  author: BasicInfo;
}
