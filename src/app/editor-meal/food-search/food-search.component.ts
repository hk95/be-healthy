import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Food } from 'src/app/interfaces/food';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { Observable } from 'rxjs';
import { FavFood } from 'src/app/interfaces/fav-food';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
})
export class FoodSearchComponent implements OnInit {
  amount = {};
  date: string;
  meal: string;
  favFoods$: Observable<FavFood[]> = this.foodService.getFavFoods(
    this.authService.uid
  );
  isLikedlist = [];
  config = this.searchService.config;

  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
    });
    this.favFoods$.subscribe((foods: Food[]) => {
      this.isLikedlist = [...new Set(foods.map((food) => food.foodId))];
    });
  }

  likeFavFood(foodId: string) {
    this.foodService.likeFavFood(this.authService.uid, foodId);
    this.isLikedlist.push(foodId);
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
}
