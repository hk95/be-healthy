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

@Component({
  selector: 'app-editor-breakfast',
  templateUrl: './editor-breakfast.component.html',
  styleUrls: ['./editor-breakfast.component.scss'],
})
export class EditorBreakfastComponent implements OnInit, AfterViewInit {
  @Input() originalFood: OriginalFood;
  foods$: Observable<OriginalFood[]> = this.foodService.getOriginalFoods();
  amout = {};
  date: string;
  breakfastFoods$: Observable<BreakfastWithMeal[]>;
  totalCal$: Observable<number>;

  constructor(
    private location: Location,
    private dailyInfoService: DailyInfoService,
    private foodService: FoodService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.date = paramMap.get('date');

      this.breakfastFoods$ = this.dailyInfoService.getDailyInfoBreakfast(
        this.authService.uid,
        this.date
      );
    });
    console.log(
      this.breakfastFoods$.pipe(
        map((breakfastFood) =>
          breakfastFood.reduce((total, cal) => total + cal.meal.calPerAmount, 0)
        )
      )
    );
    this.totalCal$ = this.breakfastFoods$.pipe(
      map((breakfastFood) =>
        breakfastFood.reduce(
          (total, foodCal) =>
            total + foodCal.meal.calPerAmount * foodCal.amount,
          0
        )
      )
    );
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

  back(): void {
    this.location.back();
  }
  ngOnInit(): void {}
  ngAfterViewInit() {}
}
