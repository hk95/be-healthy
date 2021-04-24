import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DailyMeal } from '../../interfaces/daily-info';
import { DailyInfoService } from '../../services/daily-info.service';
import { AuthService } from '../../services/auth.service';
import { AverageService } from '../../services/average.service';
import { MainShellService } from '../../services/main-shell.service';

@Component({
  selector: 'app-selected-foods',
  templateUrl: './selected-foods.component.html',
  styleUrls: ['./selected-foods.component.scss'],
})
export class SelectedFoodsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  linkQuery: { date: string; meal: string };
  selectedFoodsOrSets: DailyMeal[];
  totalCal = 0;
  loading = true;

  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private averageService: AverageService,
    private mainShellService: MainShellService
  ) {}

  private loadSelectedMeals() {
    const mealSub = this.mainShellService.selectedMeals.subscribe((v) => {
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
    this.subscription.add(mealSub);
  }

  submitDeleteData(mealId: string, amount: number, cal: number) {
    const islastMeal = this.selectedFoodsOrSets.length === 1 ? true : false;
    this.dailyInfoService.deleteMeal(
      this.authService.uid,
      this.linkQuery.date,
      mealId,
      amount,
      cal,
      islastMeal
    );
    this.totalCal -= cal * amount;
  }

  ngOnInit(): void {
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.linkQuery = {
        date: paramMaps.get('date'),
        meal: paramMaps.get('meal'),
      };
    });
    this.subscription.add(routeSub);

    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(
          this.authService.uid,
          this.linkQuery.date
        );
      }
    });

    this.subscription.add(routerSub);
    this.loadSelectedMeals();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
