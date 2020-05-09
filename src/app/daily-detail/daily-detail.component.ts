import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DailyInfoService } from '../services/daily-info.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss'],
})
export class DailyDetailComponent implements OnInit {
  @Input() user: User;
  dailyInfo$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.dailyInfo$ = this.dailyInfoService.getDailyInfo(id);
    });
  }

  ngOnInit(): void {}
}
