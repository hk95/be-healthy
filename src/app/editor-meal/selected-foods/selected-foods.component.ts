import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AverageService } from 'src/app/services/average.service';
import { DailyMeal } from 'src/app/interfaces/daily-info';

@Component({
  selector: 'app-selected-foods',
  templateUrl: './selected-foods.component.html',
  styleUrls: ['./selected-foods.component.scss'],
})
export class SelectedFoodsComponent implements OnInit, OnDestroy {
  date: string;
  meal: string;
  selectedFoodsOrSets$: Observable<DailyMeal[]>;
  totalCal$: Observable<number>;
  subscription = new Subscription();
  loading: boolean;

  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private averageService: AverageService
  ) {
    this.loading = true;
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
      this.selectedFoodsOrSets$ = this.dailyInfoService.getSelectedFoodsOrSets(
        this.authService.uid,
        this.date,
        this.meal
      );

      this.totalCal$ = this.selectedFoodsOrSets$.pipe(
        switchMap((meals) => {
          if (meals) {
            let currentcal = 0;
            meals.forEach((meal) => {
              if (meal.set) {
                return (currentcal += meal.set.setCal * meal.amount);
              } else if (meal.food) {
                return (currentcal += meal.food.foodCalPerAmount * meal.amount);
              }
            });
            this.loading = false;
            return of(currentcal);
          } else {
            this.loading = false;
            return;
          }
        })
      );
    });

    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });

    this.subscription.add(routeSub);
    this.subscription.add(routerSub);
  }
  deleteMeal(mealId: string, amount: number, cal: number) {
    this.dailyInfoService.deleteMeal(
      this.authService.uid,
      this.date,
      mealId,
      amount,
      cal
    );
  }

  ngOnInit(): void {
    this.dailyInfoService.whichMeal$.subscribe((whichMeal) => {
      if (whichMeal !== 'notChange') {
        this.meal = whichMeal;
        this.selectedFoodsOrSets$ = this.dailyInfoService.getSelectedFoodsOrSets(
          this.authService.uid,
          this.date,
          this.meal
        );
        this.totalCal$ = this.selectedFoodsOrSets$.pipe(
          switchMap((meals) => {
            let currentcal = 0;
            meals.forEach((meal) => {
              if (meal.set) {
                return (currentcal += meal.set.setCal * meal.amount);
              } else if (meal.food.foodCalPerAmount) {
                return (currentcal += meal.food.foodCalPerAmount * meal.amount);
              }
            });
            return of(currentcal);
          })
        );
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
