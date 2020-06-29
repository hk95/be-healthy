import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute } from '@angular/router';
import algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { EditorBreakfastComponent } from '../editor-breakfast/editor-breakfast.component';

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
  date: string;
  config = {
    indexName: 'foods',
    searchClient,
  };

  constructor(
    private editorBreakfastComponent: EditorBreakfastComponent,
    private foodService: FoodService,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute
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
      console.log(favFood);
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
