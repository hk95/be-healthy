import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DailyInfo } from 'src/app/interfaces/daily-info';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() dailyInfo: DailyInfo;
  date: string = this.getDate();
  dailyInfos$: Observable<DailyInfo[]> = this.dailyInfoService.getDailyInfos(
    this.authService.uid
  );
  isTodayDailyInfo$: Observable<
    DailyInfo
  > = this.dailyInfoService.isTodayDailyInfo(this.authService.uid, this.date);
  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datepipe: DatePipe
  ) {}
  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }
  ngOnInit(): void {}
}
