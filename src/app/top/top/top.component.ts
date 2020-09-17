import { Component, OnInit } from '@angular/core';

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
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  private readonly weekList = ['日', '月', '火', '水', '木', '金', '土'];
  private date: string;
  today: string = this.getDate();

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
    locale: 'ja',
    validRange: {
      start: '2018-01-01',
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

  handleDateClick(arg) {
    const week = this.weekList[arg.dayEl.cellIndex];
    this.date = arg.dateStr
      .slice(2)
      .replace(/-/g, '.')
      .replace(/$/, '(' + week + ')');
    if (this.today >= this.date) {
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

  getDate(): string {
    const d = new Date();
    return this.datePipe.transform(d, 'yy.MM.dd(E)');
  }

  ngOnInit(): void {}
}
