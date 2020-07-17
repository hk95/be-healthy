import { Pipe, PipeTransform } from '@angular/core';
import { DailyMealWithSet } from '../interfaces/daily-info';

@Pipe({
  name: 'nutrition',
})
export class NutritionPipe implements PipeTransform {
  transform(
    meals: DailyMealWithSet[],
    whichMeal: string,
    nutrition: string,
    meals2?: DailyMealWithSet[],
    meals3?: DailyMealWithSet[]
  ) {
    let totalResult = 0;

    if (meals) {
      if (whichMeal === 'all' && meals2 && meals3) {
        if (nutrition === 'cal') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodCalPerAmount * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round((totalResult + meal.set.setCal * meal.amount) * 10) /
                10;
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodCalPerAmount * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round((totalResult + meal.set.setCal * meal.amount) * 10) /
                10;
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodCalPerAmount * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round((totalResult + meal.set.setCal * meal.amount) * 10) /
                10;
            }
          });
        }
        if (nutrition === 'protein') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodProtein * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setProtein * meal.amount) * 10
                ) / 10;
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodProtein * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setProtein * meal.amount) * 10
                ) / 10;
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodProtein * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setProtein * meal.amount) * 10
                ) / 10;
            }
          });
        }
        if (nutrition === 'fat') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodFat * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round((totalResult + meal.set.setFat * meal.amount) * 10) /
                10;
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodFat * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round((totalResult + meal.set.setFat * meal.amount) * 10) /
                10;
            }
          });
        }
        if (nutrition === 'totalCarbohydrate') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult +
                    meal.food.foodTotalCarbohydrate * meal.amount) *
                    10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setTotalCarbohydrate * meal.amount) *
                    10
                ) / 10;
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult +
                    meal.food.foodTotalCarbohydrate * meal.amount) *
                    10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setTotalCarbohydrate * meal.amount) *
                    10
                ) / 10;
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult +
                    meal.food.foodTotalCarbohydrate * meal.amount) *
                    10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setTotalCarbohydrate * meal.amount) *
                    10
                ) / 10;
            }
          });
        }
        if (nutrition === 'dietaryFiber') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodDietaryFiber * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setDietaryFiber * meal.amount) * 10
                ) / 10;
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodDietaryFiber * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setDietaryFiber * meal.amount) * 10
                ) / 10;
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodDietaryFiber * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setDietaryFiber * meal.amount) * 10
                ) / 10;
            }
          });
        }
        if (nutrition === 'sugar') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodSugar * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setSugar * meal.amount) * 10
                ) / 10;
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodSugar * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setSugar * meal.amount) * 10
                ) / 10;
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodSugar * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round(
                  (totalResult + meal.set.setSugar * meal.amount) * 10
                ) / 10;
            }
          });
        }
      }
      if (whichMeal !== 'all') {
        if (nutrition === 'cal') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              totalResult =
                Math.round(
                  (totalResult + meal.food.foodCalPerAmount * meal.amount) * 10
                ) / 10;
            } else if (meal.set.setId) {
              totalResult =
                Math.round((totalResult + meal.set.setCal * meal.amount) * 10) /
                10;
            }
          });
        }
      }
    }

    return totalResult;
  }
}
