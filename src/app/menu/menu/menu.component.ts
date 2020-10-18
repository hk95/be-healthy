import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  readonly mealPageQueryParams = this.dailyInfoService
    .editorMealPageQueryParams;
  readonly mealCategory = {
    breakfast: '朝食',
    lunch: '昼食',
    dinner: '夕食',
  };
  constructor(
    public dailyInfoService: DailyInfoService,
    private mainShellService: MainShellService,
    private setService: SetService
  ) {}

  ngOnInit(): void {
    this.mainShellService.title = this.mainShellService.PAGE_TITLES.menu;
  }

  ngOnDestroy(): void {
    if (!this.setService.isEditingEditorMeal && this.mealPageQueryParams) {
      this.dailyInfoService.editorMealPageQueryParams = null;
    }
  }
}
