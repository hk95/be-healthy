import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { Location } from '@angular/common';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { OriginalFood } from 'src/app/interfaces/original-food';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DailyInfo, BreakfastWithMeal } from 'src/app/interfaces/daily-info';
import { tap, switchMap, map } from 'rxjs/operators';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-editor-breakfast',
  templateUrl: './editor-breakfast.component.html',
  styleUrls: ['./editor-breakfast.component.scss'],
})
export class EditorBreakfastComponent implements OnInit, AfterViewInit {
  @Input() originalFood: OriginalFood;
  foods$: Observable<OriginalFood[]> = this.foodService.getOriginalFoods(
    this.authService.uid
  );
  amout = {};
  date: string;
  selectedFoods$: Observable<BreakfastWithMeal[]>;
  totalCal$: Observable<number>;
  favFoods$: Observable<OriginalFood[]>;

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
            total + foodCal.meal.calPerAmount * foodCal.amount,
          0
        )
      )
    );
    this.favFoods$ = this.foodService.getFavFoods(this.authService.uid);
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

  likeFavFood(foodId: string) {
    this.foodService.likeFavFood(this.authService.uid, foodId);
  }
  unLikeFavFood(foodId: string) {
    this.foodService.unLikeFavFood(this.authService.uid, foodId);
  }
  back(): void {
    this.location.back();
  }
  ngOnInit(): void {}
  ngAfterViewInit() {}
}
