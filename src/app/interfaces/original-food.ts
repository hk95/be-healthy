export interface OriginalFood {
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
}
