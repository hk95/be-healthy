import { Component, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  readonly mealCategory = {
    breakfast: '朝食',
    lunch: '昼食',
    dinner: '夕食',
  };
  constructor(
    public dailyInfoService: DailyInfoService,
    private mainShellService: MainShellService
  ) {}

  ngOnInit(): void {
    this.mainShellService.title = this.mainShellService.PAGE_TITLES.menu;
  }
}
