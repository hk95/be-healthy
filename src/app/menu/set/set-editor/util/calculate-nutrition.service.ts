import { Injectable } from '@angular/core';
import { Food } from 'src/app/interfaces/food';
import { Recipe } from 'src/app/interfaces/recipe';
import { Nutrition } from 'src/app/interfaces/set';

@Injectable({
  providedIn: 'root',
})
export class CalculateCNitionService {
  constructor() {}

  /**
   * 小数第一位まで取得
   * @param num 計算元の数字
   */
  private getRoundNumber(num: number): number {
    return Math.round(num * 10) / 10;
  }

  calculateNutrition(
    currentNutrition: Nutrition,
    amount: number,
    food?: Food,
    recipe?: Recipe
  ): Nutrition {
    const newNutrition: Nutrition = currentNutrition;
    if (food) {
      // food の場合数量を指定できる
      newNutrition.currentCal = this.getRoundNumber(
        newNutrition.currentCal + food.foodCalPerAmount * amount
      );

      newNutrition.currentProtein = this.getRoundNumber(
        newNutrition.currentProtein + food.foodProtein * amount
      );
      newNutrition.currentFat = this.getRoundNumber(
        newNutrition.currentFat + food.foodFat * amount
      );
      newNutrition.currentTotalCarbohydrate = this.getRoundNumber(
        newNutrition.currentTotalCarbohydrate +
          food.foodTotalCarbohydrate * amount
      );
      newNutrition.currentSugar = this.getRoundNumber(
        newNutrition.currentSugar + food.foodSugar * amount
      );
      newNutrition.currentDietaryFiber = this.getRoundNumber(
        newNutrition.currentDietaryFiber + food.foodDietaryFiber * amount
      );
    } else {
      // recipe は１セットずつ
      newNutrition.currentCal = this.getRoundNumber(
        newNutrition.currentCal + amount * recipe.recipeCal
      );
      newNutrition.currentProtein = this.getRoundNumber(
        newNutrition.currentProtein + amount * recipe.recipeProtein
      );
      newNutrition.currentFat = this.getRoundNumber(
        newNutrition.currentFat + amount * recipe.recipeFat
      );
      newNutrition.currentTotalCarbohydrate = this.getRoundNumber(
        newNutrition.currentTotalCarbohydrate +
          amount * recipe.recipeTotalCarbohydrate
      );
      newNutrition.currentSugar = this.getRoundNumber(
        newNutrition.currentSugar + amount * recipe.recipeSugar
      );
      newNutrition.currentDietaryFiber = this.getRoundNumber(
        newNutrition.currentDietaryFiber + amount * recipe.recipeDietaryFiber
      );
    }
    return newNutrition;
  }
}
