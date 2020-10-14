import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Food } from 'src/app/interfaces/food';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { Subscription } from 'rxjs';
import { AverageService } from 'src/app/services/average.service';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MealInputComponent } from 'src/app/bottom-sheet/meal-input/meal-input.component';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
})
export class FoodSearchComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private date: string;

  readonly maxSelectNum = 50;
  readonly getNumber = 500;
  readonly minAmount = 0;
  readonly maxAmount = 10000;
  selectedMealsNum: number;
  amount = [].fill(0);
  isLikedlist: string[] = new Array();
  config = this.searchService.config;
  amountForm = this.fb.group({
    amountArray: this.fb.array([]),
    // 1: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 2: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 3: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 4: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 5: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 6: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 7: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 8: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    // 9: [0, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
  });
  get amountArray(): FormArray {
    return this.amountForm.get('amountArray') as FormArray;
  }

  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private averageService: AverageService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private mainShellService: MainShellService
  ) {
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.getFavFoods();
      this.setFormArray();
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
    } else {
      this.snackBar.open('数値を入力してください', null, {
        duration: 2000,
      });
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
