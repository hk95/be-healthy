import { Component, OnDestroy, OnInit } from '@angular/core';

import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { DailyInfo, DailyInfoList } from 'src/app/interfaces/daily-info';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private readonly today: string = this.getDate();
  private subscription: Subscription;

  dailyInfos: DailyInfo[] = new Array();

  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datepipe: DatePipe
  ) {
    this.dailyInfoService.createDailyInfo({
      authorId: this.authService.uid,
      date: this.today,
    });
    this.getDailyInfo();
  }

  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }

  getDailyInfo() {
    this.subscription = this.dailyInfoService
      .getDailyInfosOfMonth(this.authService.uid, this.today)
      .subscribe((monthData: DailyInfoList) => {
        for (let i = 1; i <= 31; i++) {
          if (monthData.list[i]) {
            this.dailyInfos.unshift(monthData.list[i]);
          }
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
