import { Pipe, PipeTransform } from '@angular/core';
import { DailyMeal } from '../interfaces/daily-info';

@Pipe({
  name: 'nutrition',
})
export class NutritionPipe implements PipeTransform {
  transform(
    meals: DailyMeal[],
    whichMeal: string,
    nutrition: string,
    meals2?: DailyMeal[],
    meals3?: DailyMeal[]
  ) {
    let totalResult = 0;
    const calculation = (amount: number, value: number) => {
      return (totalResult =
        Math.round((totalResult + amount * value) * 10) / 10);
    };

    if (meals) {
      if (whichMeal === 'all' && meals2 && meals3) {
        if (nutrition === 'cal') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodCalPerAmount);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setCal);
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodCalPerAmount);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setCal);
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodCalPerAmount);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setCal);
            }
          });
        }
        if (nutrition === 'protein') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodProtein);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setProtein);
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodProtein);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setProtein);
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodProtein);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setProtein);
            }
          });
        }
        if (nutrition === 'fat') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodFat);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setFat);
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodFat);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setFat);
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodFat);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setFat);
            }
          });
        }
        if (nutrition === 'totalCarbohydrate') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodTotalCarbohydrate);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setTotalCarbohydrate);
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodTotalCarbohydrate);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setTotalCarbohydrate);
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodTotalCarbohydrate);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setTotalCarbohydrate);
            }
          });
        }
        if (nutrition === 'dietaryFiber') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodDietaryFiber);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setDietaryFiber);
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodDietaryFiber);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setDietaryFiber);
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodDietaryFiber);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setDietaryFiber);
            }
          });
        }
        if (nutrition === 'sugar') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodSugar);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setSugar);
            }
          });
          meals2.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodSugar);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setSugar);
            }
          });
          meals3.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodSugar);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setSugar);
            }
          });
        }
      }
      if (whichMeal !== 'all') {
        if (nutrition === 'cal') {
          meals.forEach((meal) => {
            if (meal.food.foodId) {
              calculation(meal.amount, meal.food.foodCalPerAmount);
            } else if (meal.set.setId) {
              calculation(meal.amount, meal.set.setCal);
            }
          });
        }
      }
    }

    return totalResult;
  }
}
