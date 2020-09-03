import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/interfaces/food';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AverageService } from 'src/app/services/average.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fav-foods',
  templateUrl: './fav-foods.component.html',
  styleUrls: ['./fav-foods.component.scss'],
})
export class FavFoodsComponent implements OnInit, OnDestroy {
  amount = [].fill(0);
  date: string;
  meal: string;
  routerSub: Subscription;
  favFoods$: Observable<Food[]> = this.foodService.getFavFoods(
    this.authService.uid
  );
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
    private router: Router,
    private averageService: AverageService,
    private fb: FormBuilder
  ) {
    this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
    });
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });
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

  unLikeFavFood(foodId: string) {
    this.foodService.unLikeFavFood(this.authService.uid, foodId);
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
