import { Component, OnDestroy, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { MainShellService } from 'src/app/services/main-shell.service';
import { Router } from '@angular/router';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TutorialComponent } from 'src/app/dialogs/tutorial/tutorial.component';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { BasicInfo } from 'src/app/interfaces/basic-info';
import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DailyInfoList } from 'src/app/interfaces/daily-info';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit, OnDestroy {
  private readonly weekList = ['日', '月', '火', '水', '木', '金', '土'];
  private readonly today: string = this.getDate();
  private date: string;
  private isDataList = [];
  private subscription: Subscription;

  minDate = this.getDate(new Date(2018, 0, 1));
  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    theme: 'standart',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next',
    },
    events: [],
    locale: 'ja',
    dayCellContent(event) {
      event.dayNumberText = event.dayNumberText.replace('日', '');
    },
    businessHours: true,
    dateClick: this.handleDateClick.bind(this),
  };
  basicInfo$: Observable<BasicInfo>;

  constructor(
    private mainShellService: MainShellService,
    private router: Router,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private dialog: MatDialog,
    private basicInfoService: BasicInfoService,
    private datePipe: DatePipe
  ) {
    this.isInitLogin();
    this.mainShellService.setTitle('TOP');
    this.getDailyInfos();
  }

  isInitLogin() {
    this.basicInfo$ = this.basicInfoService.getBasicInfo(this.authService.uid);
    if (this.authService.isInitialLogin) {
      this.dialog.open(TutorialComponent, {
        width: '100%',
      });
      this.authService.isInitialLogin = false;
    }
  }

  getDailyInfos() {
    this.subscription = this.dailyInfoService
      .getDailyInfosOfMonths(this.authService.uid, this.today)
      .subscribe((v: DailyInfoList[]) => {
        v.forEach((monthData: DailyInfoList) => {
          for (let i = 1; i <= 31; i++) {
            if (monthData.list[i]) {
              const correctedDate = monthData.list[i].date
                .replace(/\./g, '-')
                .substr(0, 8)
                .replace(/^/, '20');
              console.log(correctedDate);
              if (monthData.list[i].currentWeight) {
                this.isDataList.push({
                  date: correctedDate,
                  display: 'list-item',
                  color: '#1976D2',
                });
              }
              if (monthData.list[i].totalCal) {
                this.isDataList.push({
                  date: correctedDate,
                  display: 'list-item',
                  color: '#d32f2f',
                });
              }
            }
            this.calendarOptions.events = this.isDataList;
          }
        });
      });
  }

  handleDateClick(arg) {
    const week = this.weekList[arg.dayEl.cellIndex];
    this.date = arg.dateStr
      .slice(2)
      .replace(/-/g, '.')
      .replace(/$/, '(' + week + ')');
    if (this.today >= this.date && this.minDate <= this.date) {
      this.dailyInfoService.createDailyInfo({
        authorId: this.authService.uid,
        date: this.date,
      });
      this.router.navigate(['/daily-detail'], {
        queryParams: {
          date: this.date,
        },
      });
    }
  }

  getDate(event?: Date): string {
    if (event) {
      return this.datePipe.transform(event, 'yy.MM.dd(E)');
    } else {
      const d = new Date();
      return this.datePipe.transform(d, 'yy.MM.dd(E)');
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
