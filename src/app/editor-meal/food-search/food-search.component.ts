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
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
})
export class FoodSearchComponent implements OnInit, OnDestroy {
  getNumber = 500;
  amount = [].fill(0);
  date: string;
  meal: string;
  isLikedlist: string[] = new Array();
  config = this.searchService.config;
  subscription = new Subscription();
  minAmount = 0;
  maxAmount = 10000;
  amountForm = this.fb.group({
    amount: [
      0,
      [Validators.min(this.minAmount), Validators.max(this.maxAmount)],
    ],
  });
  get amountControl(): FormControl {
    return this.amountForm.get('amount') as FormControl;
  }
  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private averageService: AverageService,
    private fb: FormBuilder
  ) {
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
      this.getFavFoods();
    });

    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });
    this.subscription.add(routeSub);
    this.subscription.add(routerSub);
  }
  getFavFoods() {
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
    const meal: DailyMeal = { mealId: '', food, amount };
    this.dailyInfoService.addMeal(
      meal,
      this.authService.uid,
      this.date,
      'food'
    );
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
