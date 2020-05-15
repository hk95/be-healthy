export interface AddedFood {
  foodId: string;
  foodName: string;
  foodImage: string;
  foodCal: number;
  foodNutrition: string;
  autherId: string;
  createdAt: Date;
  foodRecipe: string; // 動画は後々検討
  foodMemo: string;
}
