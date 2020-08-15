import { Component, OnInit } from '@angular/core';
import { MainShellService } from '../services/main-shell.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyInfoService } from '../services/daily-info.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title$: Observable<string> = this.mainShellService.title$;
  titleMeal$: Observable<string> = this.mainShellService.titleMeal$;
  date: string;
  avatarURL: string;
  selectedValue: string;
  mealTitle: string;
  more = false;
  viewX: number;
  constructor(
    private mainShellService: MainShellService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.userService.getUser(this.authService.uid).subscribe((result) => {
      this.avatarURL = result.avatarURL;
    });
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
      }
    });
    if (innerWidth > 750) {
      this.more = true;
      this.viewX = innerWidth / 2;
    }
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
    console.log(this.date);
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
}
