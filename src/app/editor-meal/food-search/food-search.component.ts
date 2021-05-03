import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

import { Subscription } from 'rxjs';
import { AverageService } from 'src/app/services/average.service';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
})
export class FoodSearchComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  date: string;
  readonly maxSelectNum = 50;
  selectedMealsNum: number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private averageService: AverageService,
    private mainShellService: MainShellService
  ) {
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
    });

    const selectedSub = this.getSelectedMeals();

    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });
    this.subscription.add(routeSub);
    this.subscription.add(selectedSub);
    this.subscription.add(routerSub);
  }

  private getSelectedMeals() {
    this.mainShellService.selectedMeals.subscribe((v) => {
      this.selectedMealsNum = v?.length;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
