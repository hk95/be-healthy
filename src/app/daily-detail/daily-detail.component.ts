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
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss'],
  providers: [NutritionPipe, PfcBalancePipe],
})
export class DailyDetailComponent implements OnInit, OnDestroy {
  private readonly userId = this.authService.uid;
  private subscription = new Subscription();

  readonly maxWeight = 200;
  readonly maxFat = 100;
  readonly minWeightAndFat = 0;
  readonly maxMemoLength = 500;
  panelOpenStateBreakfast = false;
  panelOpenStateLunch = false;
  panelOpenStateDinner = false;
  date: string;
  dailyInfo: DailyInfo;
  editingWeight = false;
  formBody = this.fb.group({
    currentWeight: [
      '',
      [
        Validators.required,
        Validators.min(this.minWeightAndFat),
        Validators.max(this.maxWeight),
      ],
    ],
    currentFat: [
      '',
      [
        Validators.required,
        Validators.min(this.minWeightAndFat),
        Validators.max(this.maxFat),
      ],
    ],
  });
  formMemo = this.fb.group({
    dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
  });

  get currentWeightControl(): FormControl {
    return this.formBody.get('currentWeight') as FormControl;
  }
  get currentFatControl(): FormControl {
    return this.formBody.get('currentFat') as FormControl;
  }

  get memoControl(): FormControl {
    return this.formMemo.get('dailyMemo') as FormControl;
  }

  mealsOfBreakfast: DailyMeal[] = [];
  mealsOfLunch: DailyMeal[] = [];
  mealsOfDinner: DailyMeal[] = [];
  totalCal = 0;

  readonly displayedColumns: string[] = ['name', 'key'];
  readonly nutritionName = [
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

  readonly colorScheme = {
    domain: ['#D81B60', '#FF9800', '#3f51b5'],
  };

  readonly gradient = false;
  readonly showLegend = true;
  readonly showLabels = false;
  readonly isDoughnut = true;
  readonly arcWidth = 0.25;
  readonly legendPosition = 'below';
  readonly legendTitle = '';
  view: number[];
  data: any[] = [];
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
      this.getDailyInfoOfMeal();
      this.mainShellService.title = this.date;
    });

    this.subscription.add(routeSub);

    if (innerWidth < 500) {
      this.font = innerWidth / 28;
      this.view = [innerWidth / 1.3, innerWidth / 2];
    } else {
      this.font = 16;
      this.view = [378, 246];
    }
  }

  private getDailyInfo() {
    const dailyInfoSub = this.dailyInfoService
      .getDailyInfo(this.userId, this.date)
      .subscribe((dailyInfo: DailyInfo) => {
        if (!dailyInfo) {
          this.dailyInfoService.createDailyInfo({
            authorId: this.userId,
            date: this.date,
          });
        } else {
          this.formBody.patchValue(dailyInfo);
          this.formMemo.patchValue(dailyInfo);
          if (!dailyInfo.currentWeight) {
            this.getPreviuosWeightAndFat();
          }
        }
        this.dailyInfo = dailyInfo;
      });
    this.subscription.add(dailyInfoSub);
  }

  private getDailyInfoOfMeal() {
    const dailyInfoSub = this.dailyInfoService
      .getAllSelectedFoodsOrSets(this.userId, this.date)
      .subscribe((mealList) => {
        this.mealsOfBreakfast = mealList[0];
        this.mealsOfLunch = mealList[1];
        this.mealsOfDinner = mealList[2];
        this.totalCal = 0;

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

  private getPreviuosWeightAndFat() {
    this.dailyInfoService
      .getPreviousDailyInfo(this.userId, this.date)
      .pipe(take(1))
      .subscribe((dailyInfos?: DailyInfo[]) => {
        if (dailyInfos[0]?.currentWeight !== undefined) {
          this.formBody.patchValue(dailyInfos[0]);
        }
      });
  }

  updateWeight() {
    if (this.editingWeight === true) {
      this.dailyInfoService.updateDailyInfoBody({
        authorId: this.userId,
        date: this.date,
        currentWeight: this.formBody.value.currentWeight,
        currentFat: this.formBody.value.currentFat,
      });
      this.editingWeight = false;
    }
  }

  updateMemo() {
    this.dailyInfoService.updateDailyInfoMemo(
      this.userId,
      this.date,
      this.formMemo.value.dailyMemo
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
