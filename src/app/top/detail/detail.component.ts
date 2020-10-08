import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { DailyInfo, DailyInfoList } from 'src/app/interfaces/daily-info';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private readonly userId: string = this.authService.uid;
  private subscription: Subscription;
  private dateDiff = 0;
  private year: number;
  private month: number;
  private lastDay: number;
  @Input() minDate: string;

  readonly today: string = this.getDate();
  date: string = this.today;
  dailyInfo$: Observable<DailyInfo> = this.dailyInfoService.getDailyInfo(
    this.userId,
    this.today
  );
  dailyInfos: DailyInfo[] = new Array();
  listIndex = new Date().getDate();
  prevWeight: number;
  prevFat: number;
  editingWeight = false;
  editingMemo = false;
  maxWeight = 200;
  maxFat = 100;
  minWeightAndFat = 0;
  maxMemoLength = 500;
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

  constructor(
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datepipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.dailyInfoService.createDailyInfo({
      authorId: this.userId,
      date: this.today,
    });
    this.getDailyInfo();
  }

  getDate() {
    const d = new Date();
    if (this.dateDiff !== 0) {
      const transDate = d.setDate(d.getDate() + this.dateDiff);
      return this.datepipe.transform(transDate, 'yy.MM.dd(E)');
    } else {
      return this.datepipe.transform(d, 'yy.MM.dd(E)');
    }
  }

  private getDailyInfo() {
    this.year = Number(20 + this.date.substr(0, 2));
    this.month = Number(this.date.substr(3, 2));
    this.lastDay = new Date(this.year, this.month, 0).getDate();

    this.subscription = this.dailyInfoService
      .getDailyInfosOfMonth(this.userId, this.date)
      .subscribe((monthData: DailyInfoList) => {
        this.dailyInfos = [];
        if (monthData) {
          if (monthData) {
            for (let i = 1; i <= this.lastDay; i++) {
              const prevInfo = monthData.list[i - 2];
              if (this.date === this.today) {
                this.prevWeight = prevInfo?.currentWeight;
                this.prevFat = prevInfo?.currentFat;
                if (!this.prevWeight) {
                  this.getPreviuosWeightAndFat(true);
                }
              } else {
                this.prevWeight =
                  monthData.list[this.listIndex - 2]?.currentWeight;
                this.prevFat = monthData.list[this.listIndex - 2]?.currentFat;
                if (!this.prevWeight) {
                  this.getPreviuosWeightAndFat(true);
                }
              }
              if (monthData.list[i]) {
                if (this.listIndex === 1 && monthData.list[1]) {
                  this.formBody.patchValue(monthData.list[1]);
                  this.formMemo.patchValue(monthData.list[1]);
                } else if (this.listIndex === 1 && !monthData.list[1]) {
                  this.formMemo = this.fb.group({
                    dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
                  });
                  this.getPreviuosWeightAndFat();
                } else {
                  this.formMemo.patchValue(monthData.list[i]);
                  this.formBody.patchValue(monthData.list[i]);
                }
                this.dailyInfos.push(monthData.list[i]);
              } else {
                this.dailyInfos.push(null);
              }
            }
          }
        } else {
          this.dailyInfoService.createDailyInfosMonth(this.userId, this.date);
          for (let i = 1; i <= this.lastDay; i++) {
            this.dailyInfos.push(null);
          }
        }
      });
  }

  private getPreviuosWeightAndFat(disPatch?: boolean) {
    const prevSub = this.dailyInfoService
      .getPreviousDailyInfo(this.userId, this.date)
      .subscribe((dailyInfos?: DailyInfo[]) => {
        if (dailyInfos[0]?.currentWeight !== undefined) {
          this.prevWeight = dailyInfos[0].currentWeight;
          this.prevFat = dailyInfos[0].currentFat;
          if (!disPatch) {
            this.formBody.patchValue(dailyInfos[0]);
          }
        }
      });
    this.subscription.add(prevSub);
  }

  editMemo() {
    this.editingMemo = true;
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
    } else {
      this.editingWeight = true;
    }
  }

  updateMemo() {
    this.editingMemo = false;
    this.dailyInfoService.updateDailyInfoMemo(
      this.userId,
      this.date,
      this.formMemo.value.dailyMemo
    );
  }

  backDate() {
    this.editingWeight = false;
    this.editingMemo = false;
    this.listIndex--;
    this.dateDiff--;
    this.date = this.getDate();
    if (this.listIndex === 0) {
      this.getDailyInfo();
      this.listIndex = this.lastDay;
    }

    const dailyInfo = this.dailyInfos[this.listIndex - 1];
    const prevInfo = this.dailyInfos[this.listIndex - 2];
    if (prevInfo?.currentWeight) {
      this.prevWeight = prevInfo.currentWeight;
      this.prevFat = prevInfo.currentFat;
    } else {
      this.getPreviuosWeightAndFat(true);
    }
    if (dailyInfo?.currentWeight && dailyInfo?.dailyMemo) {
      this.formBody.patchValue(dailyInfo);
      this.formMemo.patchValue(dailyInfo);
    } else if (!dailyInfo?.currentWeight && dailyInfo?.dailyMemo) {
      this.getPreviuosWeightAndFat();
      this.formMemo.patchValue(dailyInfo);
    } else if (dailyInfo?.currentWeight && !dailyInfo?.dailyMemo) {
      this.formBody.patchValue(dailyInfo);
      this.formMemo = this.fb.group({
        dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
      });
    } else {
      this.getPreviuosWeightAndFat();
      this.formMemo = this.fb.group({
        dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
      });
    }
  }

  nextDate() {
    this.editingWeight = false;
    this.editingMemo = false;
    this.listIndex++;
    this.dateDiff++;
    this.date = this.getDate();
    this.getPreviuosWeightAndFat();

    if (this.listIndex === this.lastDay + 1) {
      this.listIndex = 1;
      this.getDailyInfo();
    }
    const dailyInfo = this.dailyInfos[this.listIndex - 1];
    const prevInfo = this.dailyInfos[this.listIndex - 2];
    if (prevInfo?.currentWeight) {
      this.prevWeight = prevInfo.currentWeight;
      this.prevFat = prevInfo.currentFat;
    } else {
      this.getPreviuosWeightAndFat(true);
    }
    if (dailyInfo?.currentWeight && dailyInfo?.dailyMemo) {
      this.formBody.patchValue(dailyInfo);
      this.formMemo.patchValue(dailyInfo);
      this.prevWeight = this.dailyInfos[this.listIndex - 2]?.currentWeight;
      this.prevFat = this.dailyInfos[this.listIndex - 2]?.currentFat;
    } else if (dailyInfo?.currentWeight && !dailyInfo?.dailyMemo) {
      this.formBody.patchValue(dailyInfo);
      this.formMemo.patchValue(dailyInfo);
      this.formMemo = this.fb.group({
        dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
      });
    } else if (!dailyInfo?.currentWeight && dailyInfo?.dailyMemo) {
      this.getPreviuosWeightAndFat();
      this.formMemo.patchValue(dailyInfo);
    } else {
      this.getPreviuosWeightAndFat();
      this.formMemo = this.fb.group({
        dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
