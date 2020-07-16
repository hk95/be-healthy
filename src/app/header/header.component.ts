import { Component, OnInit } from '@angular/core';
import { MainShellService } from '../services/main-shell.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DailyInfoService } from '../services/daily-info.service';

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
  constructor(
    private mainShellService: MainShellService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService
  ) {
    this.userService.getUser(this.authService.uid).subscribe((result) => {
      this.avatarURL = result.avatarURL;
    });
    this.route.queryParamMap.subscribe((params) => {
      this.date = params.get('date');
      this.selectedValue = params.get('meal');
      this.dailyInfoService.whichMeal = this.selectedValue;
    });
  }

  chanageMeal(meal: string) {
    this.dailyInfoService.changeMeal(meal);
  }
  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
