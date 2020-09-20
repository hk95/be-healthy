import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyInfoService } from '../services/daily-info.service';
import { Subscription } from 'rxjs';
import { DailyInfo, DailyMeal } from '../interfaces/daily-info';
import { AuthService } from '../services/auth.service';
import { MainShellService } from '../services/main-shell.service';
import { NutritionPipe } from '../pipes/nutrition.pipe';
import { PfcBalancePipe } from '../pipes/pfc-balance.pipe';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss'],
  providers: [NutritionPipe, PfcBalancePipe],
})
export class DailyDetailComponent implements OnInit, OnDestroy {
  private readonly userId = this.authService.uid;
  private subscription = new Subscription();

  date: string;
  dailyInfo: DailyInfo;
  editingMemo = false;
  maxMemoLength = 1000;
  form = this.fb.group({
    dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
  });

  mealsOfBreakfast: DailyMeal[] = [];
  mealsOfLunch: DailyMeal[] = [];
  mealsOfDinner: DailyMeal[] = [];

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
    const routeSub = this.route.queryParamMap.subscribe((params) => {
      this.date = params.get('date');

      this.getDailyInfo();
      this.mainShellService.setTitle(this.date);
    });
    const fragmentSub = this.getFragment();

    this.subscription.add(routeSub);
    this.subscription.add(fragmentSub);

    this.getDailyInfoOfMeal();

    if (innerWidth < 500) {
      this.font = innerWidth / 28;
      this.view = [innerWidth / 1.3, innerWidth / 2];
    } else {
      this.font = 16;
      this.view = [378, 246];
    }
  }

  getFragment() {
    this.route.fragment.subscribe((v) => {
      if (v === 'memo') {
        this.editingMemo = true;
      }
    });
  }

  getDailyInfo() {
    const dailyInfoSub = this.dailyInfoService
      .getDailyInfo(this.userId, this.date)
      .subscribe((dailyInfo: DailyInfo) => {
        if (!dailyInfo) {
          this.dailyInfoService.createDailyInfo({
            authorId: this.userId,
            date: this.date,
          });
        } else {
          this.form.patchValue(dailyInfo);
        }
        this.dailyInfo = dailyInfo;
      });
    this.subscription.add(dailyInfoSub);
  }

  getDailyInfoOfMeal() {
    const dailyInfoSub = this.dailyInfoService
      .getAllSelectedFoodsOrSets(this.userId, this.date)
      .subscribe((mealList) => {
        this.mealsOfBreakfast = mealList[0];
        this.mealsOfLunch = mealList[1];
        this.mealsOfDinner = mealList[2];

        this.totalCal = this.nutritionPipe.transform(
          this.mealsOfBreakfast,
          'all',
          'cal',
          this.mealsOfLunch,
          this.mealsOfDinner
        );
        this.data = [
          {
            name: '炭水化物 (%)',
            value: this.pfcBalancePipe.transform(
              this.mealsOfBreakfast,
              this.mealsOfLunch,
              this.mealsOfDinner,
              this.totalCal,
              'carbohydrate'
            ),
          },
          {
            name: 'タンパク質 (%)',
            value: this.pfcBalancePipe.transform(
              this.mealsOfBreakfast,
              this.mealsOfLunch,
              this.mealsOfDinner,
              this.totalCal,
              'protein'
            ),
          },
          {
            name: '脂質 (%)',
            value: this.pfcBalancePipe.transform(
              this.mealsOfBreakfast,
              this.mealsOfLunch,
              this.mealsOfDinner,
              this.totalCal,
              'fat'
            ),
          },
        ];
      });
    this.subscription.add(dailyInfoSub);
  }

  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.font = innerWidth / 28;
      this.view = [event.target.innerWidth / 1.3, event.target.innerWidth / 2];
      this.font = innerWidth / 28;
    }
  }

  get memoControl(): FormControl {
    return this.form.get('dailyMemo') as FormControl;
  }

  editMemo() {
    this.editingMemo = true;
  }

  updateMemo() {
    this.editingMemo = false;
    this.dailyInfoService.updateDailyInfoMemo(
      this.userId,
      this.date,
      this.form.value.dailyMemo
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
