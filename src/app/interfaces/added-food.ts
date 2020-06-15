import { firestore } from 'firebase';

export interface AddedFood {
  recipeId: string;
  recipeTitle: string;
  recipeThumbnailURL?: string;
  recipeDescription?: string;
  recipelCal?: number;
  recipeProtein?: number;
  recipeFat?: number;
  recipeTotalCarbohydrate?: number;
  recipeDietaryFiber?: number;
  recipeSugar?: number;
  foods: [{ name: string; amountAndUnit: string }];
  processes?: [{ photoURL: string; description: string }];
  public: boolean;
  authorId: string;
  craetedAt: firestore.Timestamp;
}
