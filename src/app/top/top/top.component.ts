import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  dailyInfo$: Observable<User> = this.dailyInfoService.getDailyInfo(
    this.authService.uid
  );
  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
