import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Food } from '../../interfaces/food';
import { FoodService } from '../../services/food.service';
import { AuthService } from '../../services/auth.service';
import { DailyInfoService } from '../../services/daily-info.service';
import { AverageService } from '../../services/average.service';
import { MainShellService } from '../../services/main-shell.service';
import { MealInputComponent } from '../../bottom-sheet/meal-input/meal-input.component';
import { DailyMeal } from '../../interfaces/daily-info';

@Component({
  selector: 'app-fav-foods',
  templateUrl: './fav-foods.component.html',
  styleUrls: ['./fav-foods.component.scss'],
})
export class FavFoodsComponent implements OnInit, OnDestroy {
  private readonly getNumber = 10;
  private lastDoc: QueryDocumentSnapshot<Food>;
  private subscription = new Subscription();
  private count = 0;

  readonly maxSelectNum = 50;
  readonly minAmount = 0;
  readonly maxAmount = 10000;
  selectedMealsNum: number;
  amount = new Array(10).fill(0);
  date: string;
  meal: string;
  favFoods: Food[] = new Array();
  loading: boolean;
  isNext: boolean;
  amountForm = this.fb.group({
    amountArray: this.fb.array([]),
  });
  get amountArray(): FormArray {
    return this.amountForm.get('amountArray') as FormArray;
  }

  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private averageService: AverageService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private mainShellService: MainShellService
  ) {
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
      this.getFoods();
    });
    const selectedSub = this.getSelectedMeals();
    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });
    this.subscription.add(routeSub);
    this.subscription.add(selectedSub);
    this.subscription.add(routerSub);
  }

  private setFormArray(count: number) {
    const minCount = count * 10;
    for (let i = minCount; i < minCount + 10; i++) {
      const amountGroup = this.fb.group({
        [i]: [
          0,
          [Validators.min(this.minAmount), Validators.max(this.maxAmount)],
        ],
      });
      this.amountArray.push(amountGroup);
    }
    this.count++;
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
    } else {
      this.snackBar.open('数値を入力してください', null, {
        duration: 2000,
      });
    }
  }

  getFoods() {
    this.loading = true;
    this.setFormArray(this.count);
    this.foodService
      .getFavFoods(this.authService.uid, this.getNumber, this.lastDoc)
      .pipe(take(1))
      .subscribe((foods) => {
        if (foods && foods.length > 0) {
          foods.forEach(
            (food: {
              data: Food;
              nextLastDoc: QueryDocumentSnapshot<Food>;
            }) => {
              this.favFoods.push(food.data);
              this.lastDoc = food.nextLastDoc;
            }
          );
          foods.length >= this.getNumber
            ? (this.isNext = true)
            : (this.isNext = false);
        } else {
          this.isNext = false;
        }
        this.loading = false;
      });
  }

  unLikeFavFood(foodId: string, index: number) {
    this.foodService.unLikeFavFood(this.authService.uid, foodId);
    this.favFoods.splice(index, 1);
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

  private getSelectedMeals() {
    this.mainShellService.selectedMeals.subscribe((v) => {
      this.selectedMealsNum = v?.length;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
