import { Pipe, PipeTransform } from '@angular/core';
import { DailyMeal } from '../interfaces/daily-info';

@Pipe({
  name: 'pfcBalance',
})
export class PfcBalancePipe implements PipeTransform {
  transform(
    breakfast: DailyMeal[],
    lunch: DailyMeal[],
    dinner: DailyMeal[],
    totalCal: number,
    nutrition: string
  ) {
    console.log(breakfast, lunch, dinner);

    console.log(totalCal);
    let totalValue = 0;

    const calculation = (amount: number, value: number, factor: number) => {
      return (totalValue += amount * value * factor);
    };
    if (breakfast || lunch || dinner) {
      if (nutrition === 'carbohydrate') {
        breakfast.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodTotalCarbohydrate, 4);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setTotalCarbohydrate, 4);
          }
        });
        lunch.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodTotalCarbohydrate, 4);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setTotalCarbohydrate, 4);
          }
        });
        dinner.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodTotalCarbohydrate, 4);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setTotalCarbohydrate, 4);
          }
        });
      } else if (nutrition === 'protein') {
        breakfast.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodProtein, 4);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setProtein, 4);
          }
        });
        lunch.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodProtein, 4);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setProtein, 4);
          }
        });
        dinner.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodProtein, 4);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setProtein, 4);
          }
        });
      } else if (nutrition === 'fat') {
        breakfast.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodFat, 9);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setFat, 9);
          }
        });
        lunch.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodFat, 9);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setFat, 9);
          }
        });
        dinner.forEach((meal: DailyMeal) => {
          if (meal.food.foodId) {
            calculation(meal.amount, meal.food.foodFat, 9);
          } else if (meal.set.setId) {
            calculation(meal.amount, meal.set.setFat, 9);
          }
        });
      }
    }

    return Math.round((totalValue / totalCal) * 100 * 10) / 10;
  }
}
