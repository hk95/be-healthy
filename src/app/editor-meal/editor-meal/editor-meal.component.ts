import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-editor-meal',
  templateUrl: './editor-meal.component.html',
  styleUrls: ['./editor-meal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorMealComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private readonly userId = this.authService.uid;

  readonly maxSelectNum = 50;
  selectedFoodsOrSets: DailyMeal[];
  date: string;
  meal: string;

  constructor(
    private route: ActivatedRoute,
    private mainShellService: MainShellService,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService
  ) {
    const querySub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
      this.mainShellService.title = this.date;
      this.getMeals();
      this.createDailyInfo();
      this.mainShellService.titleMeal = this.meal;
    });
    this.subscription.add(querySub);
  }

  private createDailyInfo() {
    this.dailyInfoService.createDailyInfo({
      authorId: this.userId,
      date: this.date,
    });
  }

  private getMeals() {
    const mealSub = this.dailyInfoService
      .getSelectedFoodsOrSets(this.userId, this.date, this.meal)
      .subscribe((v) => {
        this.selectedFoodsOrSets = v;
        this.mainShellService.setSelectedMeals(this.selectedFoodsOrSets);
      });
    this.subscription.add(mealSub);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
