import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-editor-meal',
  templateUrl: './editor-meal.component.html',
  styleUrls: ['./editor-meal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorMealComponent implements OnInit {
  date: string;
  meal: string;

  constructor(
    private route: ActivatedRoute,
    private mainShellService: MainShellService
  ) {
    this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
      this.mainShellService.setTitle(this.date);
    });
    this.mainShellService.setTitleMeal(this.meal);
  }

  ngOnInit(): void {}
}
