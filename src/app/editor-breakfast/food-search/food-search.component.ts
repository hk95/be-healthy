import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute } from '@angular/router';
import { FavFood } from 'src/app/interfaces/fav-food';
import algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';

// Algoliakey取得 => Algoliaアクセス可
const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);
@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
})
export class FoodSearchComponent implements OnInit {
  amout = {};
  isLikedlist = [];

  date: string;
  config = {
    indexName: 'foods',
    searchClient,
  };

  favFoods$ = this.foodService.getfavFoodslist(this.authService.uid);
  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((date) => {
      this.date = date.get('date');
    });
    this.favFoods$.subscribe((foods: FavFood[]) => {
      console.log(foods);

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

  ngOnInit(): void {}
}
