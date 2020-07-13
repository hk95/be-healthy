import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Location } from '@angular/common';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { Food } from 'src/app/interfaces/food';
import { FoodService } from 'src/app/services/food.service';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyMealWithSet, DailyMeal } from 'src/app/interfaces/daily-info';
import { take, switchMap } from 'rxjs/operators';
import { MainShellService } from 'src/app/services/main-shell.service';
import { SetService } from 'src/app/services/set.service';
import { Set } from 'src/app/interfaces/set';

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
  favFoods$: Observable<Food[]> = this.foodService.getFavFoods(
    this.authService.uid
  );
  favFoods: Food[];
  isLikedlist = [];
  sets$: Observable<Set[]> = this.setService.getSetsOfMeal(
    this.authService.uid,
    'breakfast'
  );
  sets: Set[];
  setList = [];
  selectedFoodOrSets$: Observable<DailyMealWithSet[]>;

  totalCal$: Observable<number>;

  constructor(
    private location: Location,
    private dailyInfoService: DailyInfoService,
    private foodService: FoodService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private mainShellService: MainShellService,
    private setService: SetService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.date = paramMap.get('date');
      this.mainShellService.setTitle(this.date);
    });
    this.mainShellService.setTitleMeal('朝食');

    this.favFoods$.pipe(take(1)).subscribe((foods: Food[]) => {
      this.favFoods = foods;
      this.isLikedlist = [...new Set(foods.map((food) => food.foodId))];
    });
    this.sets$.pipe(take(1)).subscribe((sets: Set[]) => {
      this.sets = sets;
      this.setList = [...new Set(sets.map((set) => set.setId))];
    });
  }

  addSet(amount: number, setId: string) {
    const meal: DailyMeal = { mealId: '', setId, amount };
    this.dailyInfoService.addMeal(
      meal,
      this.authService.uid,
      this.date,
      'breakfast'
    );
  }
  addFood(amount: number, food: Food) {
    const meal: DailyMeal = { mealId: '', food, amount };
    this.dailyInfoService.addMeal(
      meal,
      this.authService.uid,
      this.date,
      'breakfast'
    );
  }

  deleteMeal(mealId: string) {
    this.dailyInfoService.deleteMeal(
      this.authService.uid,
      this.date,
      mealId,
      'breakfast'
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
  outSet(setId: string) {
    this.setService.updateMeal(this.authService.uid, setId, 'breakfast', false);
    const index = this.setList.indexOf(setId);
    if (index > -1) {
      this.setList.splice(index, 1);
      this.sets.splice(index, 1);
    }
  }
  back(): void {
    this.location.back();
  }
  goToSet() {
    this.dailyInfoService.goToSet(this.router.url);
  }
  ngOnInit(): void {
    this.selectedFoodOrSets$ = this.dailyInfoService.getSelectedFoodsOrSets(
      this.authService.uid,
      this.date,
      'breakfast'
    );

    this.totalCal$ = this.selectedFoodOrSets$.pipe(
      switchMap((meals) => {
        let currentcal = 0;
        meals.forEach((meal) => {
          if (meal.set.setCal) {
            return (currentcal += meal.set.setCal * meal.amount);
          } else if (meal.food.foodCalPerAmount) {
            return (currentcal += meal.food.foodCalPerAmount * meal.amount);
          }
        });
        return of(currentcal);
      })
    );
  }
}
