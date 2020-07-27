import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DailyInfoService } from '../services/daily-info.service';
import { AuthService } from '../services/auth.service';
import { DailyInfo } from '../interfaces/daily-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() dailyInfo: DailyInfo;
  date: string = this.getDate();
  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datepipe: DatePipe,
    private router: Router
  ) {}
  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }
  createDailyInfo() {
    this.dailyInfoService.createDailyInfo({
      authorId: this.authService.uid,
      date: this.date,
    });
    this.router.navigateByUrl('editor-list');
  }
  changeQuery() {
    this.dailyInfoService.queryParams = null;
  }

  ngOnInit(): void {}
}
