import { Component, OnInit } from '@angular/core';
import { DailyInfoService } from '../services/daily-info.service';
import { Router } from '@angular/router';
import { MainShellService } from '../services/main-shell.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  morePage: string;

  constructor(
    private dailyInfoService: DailyInfoService,
    private router: Router,
    private mainShellService: MainShellService
  ) {
    this.morePage = this.router.url.split('/')[1];
  }

  changeQuery() {
    this.dailyInfoService.queryParams = null;
  }

  ngOnInit(): void {}
}
