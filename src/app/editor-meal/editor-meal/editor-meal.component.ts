import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Location } from '@angular/common';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { Food } from 'src/app/interfaces/food';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BreakfastWithMeal } from 'src/app/interfaces/daily-info';
import { map, take } from 'rxjs/operators';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-editor-meal',
  templateUrl: './editor-meal.component.html',
  styleUrls: ['./editor-meal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorMealComponent implements OnInit {
  @Input() Food: Food;
  amout = {};
  date: string;
  selectedFoods$: Observable<BreakfastWithMeal[]>;
  totalCal$: Observable<number>;
  favFoods$: Observable<Food[]>;
  favFoods: Food[];
  isLikedlist = [];
  constructor(
    private location: Location,
    private dailyInfoService: DailyInfoService,
    private foodService: FoodService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private mainShellService: MainShellService
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.date = paramMap.get('date');
      this.selectedFoods$ = this.dailyInfoService.getDailyInfoBreakfast(
        this.authService.uid,
        this.date
      );
      this.mainShellService.setTitle(this.date);
    });
    this.mainShellService.setTitleMeal('朝食');

    this.totalCal$ = this.selectedFoods$.pipe(
      map((breakfastFood) =>
        breakfastFood.reduce(
          (total, foodCal) =>
            total + foodCal.meal.foodCalPerAmount * foodCal.amount,
          0
        )
      )
    );
    this.favFoods$ = this.foodService.getFavFoods(this.authService.uid);
    this.favFoods$.pipe(take(1)).subscribe((foods: Food[]) => {
      console.log(foods);
      this.favFoods = foods;
      this.isLikedlist = [...new Set(foods.map((food) => food.foodId))];
    });
  }

  addDailyInfoFood(amount: number, foodId: string) {
    this.dailyInfoService.addDailyInfoBreakfast({
      date: this.date,
      breakfast: {
        breakfastId: '',
        amount,
        foodId,
      },
      authorId: this.authService.uid,
    });
  }
  deleteDailyInfoFood(breakfastId: string) {
    this.dailyInfoService.deleteDailyInfoFood(
      this.authService.uid,
      this.date,
      breakfastId
    );
  }

  unLikeFavFood(foodId: string) {
    this.foodService.unLikeFavFood(this.authService.uid, foodId);
    const index = this.isLikedlist.indexOf(foodId);
    if (index > -1) {
      this.isLikedlist.splice(index, 1);
      this.favFoods.splice(index, 1);
    }
  }
  back(): void {
    this.location.back();
  }

  ngOnInit(): void {}
}
