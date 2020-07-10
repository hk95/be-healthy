import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Location } from '@angular/common';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { Food } from 'src/app/interfaces/food';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DailyMealWithSet, DailyMeal } from 'src/app/interfaces/daily-info';
import { map, take } from 'rxjs/operators';
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

  favFoods$: Observable<Food[]>;
  favFoods: Food[];
  isLikedlist = [];
  sets$: Observable<Set[]> = this.setService.getSetsOfMeal(
    this.authService.uid,
    'breakfast'
  );
  sets: Set[];
  setList = [];
  selectedFoods$: Observable<DailyMeal[]>;
  selectedSets$: Observable<DailyMealWithSet[]>;
  totalCal$: Observable<number>;
  constructor(
    private location: Location,
    private dailyInfoService: DailyInfoService,
    private foodService: FoodService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private mainShellService: MainShellService,
    private setService: SetService
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.date = paramMap.get('date');
      this.mainShellService.setTitle(this.date);
    });
    this.mainShellService.setTitleMeal('朝食');

    this.favFoods$ = this.foodService.getFavFoods(this.authService.uid);
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
    this.dailyInfoService.addSet(
      meal,
      this.authService.uid,
      this.date,
      'breakfast'
    );
  }
  addFood(amount: number, food: Food) {
    const meal: DailyMeal = { mealId: '', food, amount };
    this.dailyInfoService.addFood(
      meal,
      this.authService.uid,
      this.date,
      'breakfast'
    );
  }
  deleteMeal(mealId: string, foodOrSet: string) {
    this.dailyInfoService.deleteMeal(
      this.authService.uid,
      this.date,
      mealId,
      'breakfast',
      foodOrSet
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

  ngOnInit(): void {
    this.selectedFoods$ = this.dailyInfoService.getSelectedFoods(
      this.authService.uid,
      this.date,
      'breakfast'
    );
    this.selectedSets$ = this.dailyInfoService.getSelectedSets(
      this.authService.uid,
      this.date,
      'breakfast'
    );
    // this.totalCal$ = this.selectedFoodsOrSets$.pipe(
    //   map((FoodOrSet) =>
    //     FoodOrSet.reduce(
    //       (total, foodCal) =>
    //         total +
    //         foodCal.food.foodCalPerAmount * foodCal.amount +
    //         foodCal.set.setCal * foodCal.amount,
    //       0
    //     )
    //   )
    // );
  }
}
