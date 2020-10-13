import { Component, OnInit } from '@angular/core';
import { DailyInfoService } from '../services/daily-info.service';
import { MainShellService } from '../services/main-shell.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private dailyInfoService: DailyInfoService,
    public mainShellService: MainShellService
  ) {}

  changeQuery() {
    this.dailyInfoService.queryParams = null;
  }

  ngOnInit(): void {}
}
