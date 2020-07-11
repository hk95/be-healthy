import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute } from '@angular/router';
import { EditorMealComponent } from '../editor-meal/editor-meal.component';
import { SearchService } from 'src/app/services/search.service';
import { Food } from 'src/app/interfaces/food';
import { DailyMeal } from 'src/app/interfaces/daily-info';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
})
export class FoodSearchComponent implements OnInit {
  amout = {};
  date: string;
  config = this.searchService.config;

  constructor(
    public editorBreakfastComponent: EditorMealComponent,
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.route.paramMap.subscribe((date) => {
      this.date = date.get('date');
    });
  }

  likeFavFood(foodId: string) {
    this.foodService.likeFavFood(this.authService.uid, foodId);
    this.editorBreakfastComponent.isLikedlist.push(foodId);
    this.foodService.getFoodByFoodId(foodId).subscribe((food) => {
      const favFood = food;
      this.editorBreakfastComponent.favFoods.push(favFood);
    });
  }
  unLikeFavFood(foodId: string) {
    this.foodService.unLikeFavFood(this.authService.uid, foodId);
    const index = this.editorBreakfastComponent.isLikedlist.indexOf(foodId);
    if (index > -1) {
      this.editorBreakfastComponent.isLikedlist.splice(index, 1);
      this.editorBreakfastComponent.favFoods.splice(index, 1);
    }
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

  ngOnInit(): void {}
}
