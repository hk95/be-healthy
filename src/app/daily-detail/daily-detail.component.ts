import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyInfoService } from '../services/daily-info.service';
import { Observable } from 'rxjs';
import { DailyInfo, DailyMealWithSet } from '../interfaces/daily-info';
import { AuthService } from '../services/auth.service';
import { MainShellService } from '../services/main-shell.service';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss'],
})
export class DailyDetailComponent implements OnInit {
  dailyInfo$: Observable<DailyInfo>;
  date: string;

  MealsOfBreakfast: DailyMealWithSet[];
  MealsOfLunch: DailyMealWithSet[];
  MealsOfDinner: DailyMealWithSet[];

  displayedColumns: string[] = ['name', 'key'];
  nutritionName = [
    { name: '総摂取カロリー', key: 'cal', unit: 'kcal', percentage: '--' },
    { name: 'タンパク質', key: 'protein', unit: 'g', percentage: 'true' },
    { name: '脂質', key: 'fat', unit: 'g', percentage: 'true' },
    {
      name: '炭水化物',
      key: 'totalCarbohydrate',
      unit: 'g',
      percentage: 'true',
    },
    { name: '食物繊維', key: 'dietaryFiber', unit: 'g', percentage: 'true' },
    { name: '糖質', key: 'sugar', unit: 'g', percentage: 'true' },
  ];
  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private mainShellService: MainShellService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.date = params.get('date');
      this.dailyInfo$ = this.dailyInfoService.getDailyInfo(
        this.authService.uid,
        this.date
      );
      this.mainShellService.setTitle(this.date);
    });
    this.dailyInfoService
      .getSelectedFoodsOrSets(this.authService.uid, this.date, 'breakfast')
      .subscribe((meals) => (this.MealsOfBreakfast = meals));
    this.dailyInfoService
      .getSelectedFoodsOrSets(this.authService.uid, this.date, 'lunch')
      .subscribe((meals) => (this.MealsOfLunch = meals));
    this.dailyInfoService
      .getSelectedFoodsOrSets(this.authService.uid, this.date, 'dinner')
      .subscribe((meals) => (this.MealsOfDinner = meals));
  }

  ngOnInit(): void {}
}
