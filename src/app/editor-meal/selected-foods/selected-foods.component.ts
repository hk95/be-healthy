import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { DailyMealWithSet } from 'src/app/interfaces/daily-info';
import { switchMap } from 'rxjs/operators';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AverageService } from 'src/app/services/average.service';

@Component({
  selector: 'app-selected-foods',
  templateUrl: './selected-foods.component.html',
  styleUrls: ['./selected-foods.component.scss'],
})
export class SelectedFoodsComponent implements OnInit, OnDestroy {
  date: string;
  meal: string;
  selectedFoodsOrSets$: Observable<DailyMealWithSet[]>;
  totalCal$: Observable<number>;
  routerSub: Subscription;
  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private averageService: AverageService
  ) {
    this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
      this.selectedFoodsOrSets$ = this.dailyInfoService.getSelectedFoodsOrSets(
        this.authService.uid,
        this.date,
        this.meal
      );
      this.totalCal$ = this.selectedFoodsOrSets$.pipe(
        switchMap((meals) => {
          let currentcal = 0;
          meals.forEach((meal) => {
            if (meal.set.setCal) {
              return (currentcal += meal.set.setCal * meal.amount);
            } else if (meal.food.foodCalPerAmount) {
              return (currentcal += meal.food.foodCalPerAmount * meal.amount);
            }
          });
          return of(currentcal);
        })
      );
    });

    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
        console.log(this.date, 'ts');
      }
    });
  }
  deleteMeal(mealId: string, amount: number, cal: number) {
    console.log(this.date);
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
              if (meal.set.setCal) {
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
    this.routerSub.unsubscribe();
  }
}
