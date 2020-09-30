import { Component, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  queryParams = this.dailyInfoService.queryParams;
  constructor(
    private router: Router,
    private dailyInfoService: DailyInfoService,
    private mainShellService: MainShellService
  ) {
    this.mainShellService.setTitle('マイメニュー');
  }

  backToMeal() {
    this.router.navigate(['/editor-meal/my-set'], {
      queryParams: {
        date: this.queryParams[0],
        meal: this.queryParams[1],
      },
    });
  }

  ngOnInit(): void {}
}
