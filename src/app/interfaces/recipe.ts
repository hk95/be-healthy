import { firestore } from 'firebase';
import { User } from './user';

export interface Recipe {
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

export interface RecipeWithAuthor extends Recipe {
  author: User;
}
