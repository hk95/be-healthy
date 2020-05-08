import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() user: User;
  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datepipe: DatePipe
  ) { }
  today: string = this.getDate();
  dailyInfos$: Observable<User[]> = this.dailyInfoService.getDailyInfos(
    this.authService.uid
  );
  isToday$: Observable<User> = this.dailyInfoService.isToday(this.today);
  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }
  ngOnInit(): void {
  }

}
