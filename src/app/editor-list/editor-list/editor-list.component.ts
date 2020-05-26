import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { DailyInfo } from 'src/app/interfaces/daily-info';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.scss'],
})
export class EditorListComponent implements OnInit {
  date: string = this.getDate();
  dailyInfo$: Observable<DailyInfo> = this.dailyInfoService.getDailyInfo(
    this.authService.uid,
    this.date
  );
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
