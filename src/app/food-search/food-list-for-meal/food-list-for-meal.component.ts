import { Component, Input, OnInit } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take } from 'rxjs/operators';
import { MealInputComponent } from 'src/app/bottom-sheet/meal-input/meal-input.component';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { Food } from 'src/app/interfaces/food';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-list-for-meal',
  templateUrl: './food-list-for-meal.component.html',
  styleUrls: ['./food-list-for-meal.component.scss'],
  standalone: false,
})
export class FoodListForMealComponent implements OnInit {
  @Input() date: string;
  @Input() foods: Food[];
  @Input() isAddable: boolean;

  readonly getNumber = 500;
  readonly minAmount = 0;
  readonly maxAmount = 10000;
  amount = new Array(10).fill(0);
  isLikedlist: string[] = new Array();

  amountForm = this.fb.group({
    amountArray: this.fb.array([]),
  });
  get amountArray(): UntypedFormArray {
    return this.amountForm.get('amountArray') as UntypedFormArray;
  }

  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,

    private fb: UntypedFormBuilder,
    private bottomSheet: MatBottomSheet
  ) {
    this.getFavFoods();
    this.setFormArray();
  }

  ngOnInit(): void {}

  // 食べ物を登録するフォームにバリデーションを設定している
  private setFormArray() {
    for (let i = 0; i < 10; i++) {
      const amountGroup = this.fb.group({
        [i]: [
          0,
          [Validators.min(this.minAmount), Validators.max(this.maxAmount)],
        ],
      });
      this.amountArray.push(amountGroup);
    }
  }

  private getFavFoods() {
    this.foodService
      .getFavFoods(this.authService.uid, this.getNumber)
      .pipe(take(1))
      .subscribe((foods) => {
        if (foods && foods.length > 0) {
          foods.forEach(
            (food: {
              data: Food;
              nextLastDoc: QueryDocumentSnapshot<Food>;
            }) => {
              this.isLikedlist.push(food.data.foodId);
            }
          );
        }
      });
  }

  likeFavFood(food: Food) {
    this.foodService.likeFavFood(this.authService.uid, food);
    this.isLikedlist.push(food.foodId);
  }

  unLikeFavFood(foodId: string) {
    this.foodService.unLikeFavFood(this.authService.uid, foodId);
    const index = this.isLikedlist.indexOf(foodId);
    if (index > -1) {
      this.isLikedlist.splice(index, 1);
    }
  }

  addFood(amount: number, food: Food) {
    if (amount >= 0) {
      const meal: DailyMeal = { mealId: '', food, amount };
      this.dailyInfoService.addMeal(
        meal,
        this.authService.uid,
        this.date,
        'food'
      );
    }
  }

  openBottomSheet(food: Food): void {
    this.bottomSheet.open(MealInputComponent, {
      data: {
        userId: this.authService.uid,
        date: this.date,
        maxAmount: this.maxAmount,
        minAmount: this.minAmount,
        food,
      },
    });
  }
}
