export interface Food {
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
}
