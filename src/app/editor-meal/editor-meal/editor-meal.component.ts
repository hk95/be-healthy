import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  linkQuery: { date: string; meal: string };
  selectedFoodsOrSets$: Observable<DailyMeal[]> = this.route.queryParamMap.pipe(
    switchMap((paramMaps: ParamMap) => {
      this.setProperty(paramMaps);
      this.submitUserInfo();
      return this.dailyInfoService.getSelectedFoodsOrSets(
        this.userId,
        this.linkQuery.date,
        this.linkQuery.meal
      );
    })
  );

  constructor(
    private route: ActivatedRoute,
    private mainShellService: MainShellService,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService
  ) {}

  private submitUserInfo(): void {
    this.dailyInfoService.createDailyInfo({
      authorId: this.userId,
      date: this.linkQuery.date,
    });
  }

  private setProperty(paramMaps: ParamMap): void {
    this.linkQuery = {
      date: paramMaps.get('date'),
      meal: paramMaps.get('meal'),
    };
    this.mainShellService.title = this.linkQuery.date;
    this.mainShellService.titleMeal = this.linkQuery.meal;
  }

  ngOnInit(): void {
    const mealSub = this.selectedFoodsOrSets$.subscribe((v: DailyMeal[]) =>
      this.mainShellService.setSelectedMeals(v)
    );
    this.subscription.add(mealSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
