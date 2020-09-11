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

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  date: string;
  weelList = ['日', '月', '火', '水', '木', '金', '土'];

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
    private basicInfoService: BasicInfoService
  ) {
    this.isInitLogin();
    this.mainShellService.setTitle('TOP');
  }

  isInitLogin() {
    if (this.authService.isInitialLogin) {
      this.basicInfo$ = this.basicInfoService.getBasicInfo(
        this.authService.uid
      );
      this.dialog.open(TutorialComponent, {
        width: '100%',
      });
      this.authService.isInitialLogin = false;
    } else {
      this.basicInfo$ = this.basicInfoService.getBasicInfo(
        this.authService.uid
      );
    }
  }

  handleDateClick(arg) {
    const week = this.weelList[arg.dayEl.cellIndex];
    this.date = arg.dateStr
      .slice(2)
      .replace(/-/g, '.')
      .replace(/$/, '(' + week + ')');
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

  ngOnInit(): void {}
}
