export interface OriginalFood {
  foodId: string;
  foodName: string;
  foodImage: string;
  foodCal: number;
  calPerAmount: number;
  unit: 'amount' | 'gram' | 'ml';
  protein: number;
  foodFat: number;
  totalCarbohydrate: number;
  sugar: number;
  dietaryFiber: number;
  isLiked?: boolean;
}
