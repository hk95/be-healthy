import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { SetService } from 'src/app/services/set.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

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
    private setService: SetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mainShellService.title = this.mainShellService.PAGE_TITLES.menu;
  }

  ngOnDestroy(): void {
    this.deleteEditorMealPageParams();
  }

  private deleteEditorMealPageParams(): void {
    this.router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd),
        take(1)
      )
      .subscribe((e: NavigationEnd) => {
        const nextURL = e.url;
        if (
          !this.setService.isEditingEditorMeal &&
          this.mealPageQueryParams &&
          nextURL !== '/set-editor' &&
          nextURL !== '/recipe-editor'
        ) {
          this.dailyInfoService.editorMealPageQueryParams = null;
        }
      });
  }
}
