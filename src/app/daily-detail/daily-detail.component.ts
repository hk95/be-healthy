import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DailyInfoService } from '../services/daily-info.service';
import { Observable } from 'rxjs';
import { DailyInfo } from '../interfaces/daily-info';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss'],
})
export class DailyDetailComponent implements OnInit {
  @Input() dailyInfo: DailyInfo;
  dailyInfo$: Observable<DailyInfo>;

  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService
  ) {
    this.route.paramMap.subscribe((params) => {
      const dailyId = params.get('id');
      this.dailyInfo$ = this.dailyInfoService.getDailyInfo(
        this.authService.uid,
        dailyId
      );
    });
  }

  ngOnInit(): void {}
}
