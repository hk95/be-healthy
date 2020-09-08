import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyInfoService } from '../services/daily-info.service';
import { Observable } from 'rxjs';
import { DailyInfo, DailyMeal } from '../interfaces/daily-info';
import { AuthService } from '../services/auth.service';
import { MainShellService } from '../services/main-shell.service';
import { NutritionPipe } from '../pipes/nutrition.pipe';
import { PfcBalancePipe } from '../pipes/pfc-balance.pipe';
import { take } from 'rxjs/operators';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss'],
  providers: [NutritionPipe, PfcBalancePipe],
})
export class DailyDetailComponent implements OnInit {
  dailyInfo$: Observable<DailyInfo>;
  date: string;
  editing = false;
  form = this.fb.group({
    memo: ['', [Validators.maxLength(1000)]],
  });

  MealsOfBreakfast: DailyMeal[] = [];
  MealsOfLunch: DailyMeal[] = [];
  MealsOfDinner: DailyMeal[] = [];

  totalCal = 0;

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

  colorScheme = {
    domain: ['#D81B60', '#FF9800', '#3f51b5'],
  };

  view: number[];
  data: any[] = [];
  gradient = false;
  showLegend = true;
  showLabels = false;
  isDoughnut = true;
  arcWidth = 0.25;
  legendPosition = 'below';
  legendTitle = '';
  font: number;
  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private mainShellService: MainShellService,
    private nutritionPipe: NutritionPipe,
    private pfcBalancePipe: PfcBalancePipe,
    private fb: FormBuilder
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.date = params.get('date');
      this.dailyInfo$ = this.dailyInfoService.getDailyInfo(
        this.authService.uid,
        this.date
      );
      this.mainShellService.setTitle(this.date);
    });

    this.dailyInfoService
      .getAllSelectedFoodsOrSets(this.authService.uid, this.date)
      .pipe(take(1))
      .subscribe((mealList) => {
        this.MealsOfBreakfast = mealList[0];
        this.MealsOfLunch = mealList[1];
        this.MealsOfDinner = mealList[2];

        this.totalCal = this.nutritionPipe.transform(
          this.MealsOfBreakfast,
          'all',
          'cal',
          this.MealsOfLunch,
          this.MealsOfDinner
        );
        this.data = [
          {
            name: '炭水化物 (%)',
            value: this.pfcBalancePipe.transform(
              this.MealsOfBreakfast,
              this.MealsOfLunch,
              this.MealsOfDinner,
              this.totalCal,
              'carbohydrate'
            ),
          },
          {
            name: 'タンパク質 (%)',
            value: this.pfcBalancePipe.transform(
              this.MealsOfBreakfast,
              this.MealsOfLunch,
              this.MealsOfDinner,
              this.totalCal,
              'protein'
            ),
          },
          {
            name: '脂質 (%)',
            value: this.pfcBalancePipe.transform(
              this.MealsOfBreakfast,
              this.MealsOfLunch,
              this.MealsOfDinner,
              this.totalCal,
              'fat'
            ),
          },
        ];
      });

    if (innerWidth < 500) {
      this.font = innerWidth / 28;
      this.view = [innerWidth / 1.3, innerWidth / 2];
    } else {
      this.font = 16;
      this.view = [378, 246];
    }
  }

  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.font = innerWidth / 28;
      this.view = [event.target.innerWidth / 1.3, event.target.innerWidth / 2];
      this.font = innerWidth / 28;
    }
  }
  get memoControl(): FormControl {
    return this.form.get('memo') as FormControl;
  }
  editMemo() {
    this.editing = true;
  }
  updateMemo() {
    this.editing = false;
    this.dailyInfoService.updateDailyInfoMemo(
      this.authService.uid,
      this.date,
      this.form.value.memo
    );
  }
  ngOnInit() {}
}
