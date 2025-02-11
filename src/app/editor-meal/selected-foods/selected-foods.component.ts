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
  standalone: false,
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
