import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainShellService } from '../services/main-shell.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyInfoService } from '../services/daily-info.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { BasicInfoService } from '../services/basic-info.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  date: string;
  avatarURL: string;
  selectedValue: string;
  mealTitle: string;
  viewX: number;
  maxDate = new Date();
  minDate = new Date(2018, 0, 1);

  constructor(
    public mainShellService: MainShellService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private router: Router,
    private datePipe: DatePipe,
    private basicInfoService: BasicInfoService
  ) {
    const basicInfoSub = this.basicInfoService
      .getBasicInfo(this.authService.uid)
      .subscribe((result) => {
        this.avatarURL = result?.avatarURL;
      });

    const routeSub = this.getParam();

    this.subscription.add(basicInfoSub);
    this.subscription.add(routeSub);
  }

  getParam() {
    this.route.queryParamMap.subscribe((params) => {
      this.date = params.get('date');
      this.selectedValue = params.get('meal');
      this.dailyInfoService.whichMeal = this.selectedValue;
      switch (this.selectedValue) {
        case 'breakfast':
          this.mealTitle = '朝食';
          break;
        case 'lunch':
          this.mealTitle = '昼食';
          break;
        case 'dinner':
          this.mealTitle = '夕食';
          break;
      }
    });
  }

  chanageMeal(meal: string) {
    this.dailyInfoService.changeMeal(meal);
    this.selectedValue = meal;
    switch (meal) {
      case 'breakfast':
        this.mealTitle = '朝食';
        break;
      case 'lunch':
        this.mealTitle = '昼食';
        break;
      case 'dinner':
        this.mealTitle = '夕食';
        break;
    }
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        date: this.date,
        meal: this.selectedValue,
      },
    });
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.date = this.datePipe.transform(event.value, 'yy.MM.dd(E)');
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        date: this.date,
        meal: this.selectedValue,
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
