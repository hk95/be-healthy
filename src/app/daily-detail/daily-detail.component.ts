import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DailyInfoService } from '../services/daily-info.service';
import { Observable } from 'rxjs';
import { DailyInfo } from '../interfaces/daily-info';
import { AuthService } from '../services/auth.service';
import { MainShellService } from '../services/main-shell.service';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss'],
})
export class DailyDetailComponent implements OnInit {
  @Input() dailyInfo: DailyInfo;
  dailyInfo$: Observable<DailyInfo>;
  date: string;

  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private mainShellService: MainShellService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.date = params.get('date');
      this.dailyInfo$ = this.dailyInfoService.getDailyInfo(
        this.authService.uid,
        this.date
      );
      this.mainShellService.setTitle(this.date);
    });
  }

  ngOnInit(): void {}
}
