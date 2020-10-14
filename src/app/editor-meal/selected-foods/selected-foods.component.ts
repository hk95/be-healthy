import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AverageService } from 'src/app/services/average.service';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-selected-foods',
  templateUrl: './selected-foods.component.html',
  styleUrls: ['./selected-foods.component.scss'],
})
export class SelectedFoodsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  date: string;
  meal: string;
  selectedFoodsOrSets: DailyMeal[];
  totalCal = 0;
  loading: boolean;

  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private averageService: AverageService,
    private mainShellService: MainShellService
  ) {
    this.loading = true;
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
    });

    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });

    const mealSub = this.getSelectedMeals();

    this.subscription.add(routeSub);
    this.subscription.add(routerSub);
    this.subscription.add(mealSub);
  }

  private getSelectedMeals() {
    this.mainShellService.selectedMeals.subscribe((v) => {
      this.totalCal = 0;
      if (v) {
        this.selectedFoodsOrSets = v;
        v.forEach((meal: DailyMeal) => {
          if (meal) {
            if (meal.set) {
              return (this.totalCal += meal.set.setCal * meal.amount);
            } else if (meal.food) {
              return (this.totalCal +=
                meal.food.foodCalPerAmount * meal.amount);
            }
          }
        });
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  deleteMeal(mealId: string, amount: number, cal: number) {
    const islastMeal = this.selectedFoodsOrSets.length === 1 ? true : false;
    this.dailyInfoService.deleteMeal(
      this.authService.uid,
      this.date,
      mealId,
      amount,
      cal,
      islastMeal
    );
    this.totalCal -= cal * amount;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
