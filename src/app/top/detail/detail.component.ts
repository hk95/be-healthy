import { Component, OnDestroy, OnInit } from '@angular/core';

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
  private readonly today: string = this.getDate();
  private readonly userId: string = this.authService.uid;
  private subscription: Subscription;

  dailyInfo$: Observable<DailyInfo> = this.dailyInfoService.getDailyInfo(
    this.userId,
    this.today
  );
  dailyInfos: DailyInfo[] = new Array();
  prevWeight: number;
  prevFat: number;
  editingMemo = false;
  maxMemoLength = 500;
  form = this.fb.group({
    dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
  });

  get memoControl(): FormControl {
    return this.form.get('dailyMemo') as FormControl;
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
    this.getPreviuosWeightAndFat();
  }

  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }

  private getDailyInfo() {
    this.subscription = this.dailyInfoService
      .getDailyInfosOfMonth(this.userId, this.today)
      .subscribe((monthData: DailyInfoList) => {
        this.dailyInfos = [];
        if (monthData) {
          for (let i = 1; i <= 31; i++) {
            if (monthData.list[i]) {
              if (monthData.list[i].date !== this.today) {
                this.prevWeight = monthData.list[i].currentWeight;
                this.prevFat = monthData.list[i].currentFat;
              }
              if (monthData.list[i].date === this.today) {
                this.form.patchValue(monthData.list[i]);
              }
              this.dailyInfos.unshift(monthData.list[i]);
            }
          }
        }
      });
  }

  private getPreviuosWeightAndFat() {
    this.dailyInfoService
      .getPreviousDailyInfo(this.userId, this.today)
      .subscribe((dailyInfos?: DailyInfo[]) => {
        if (dailyInfos[0]?.currentWeight !== undefined) {
          this.prevWeight = dailyInfos[0].currentWeight;
          this.prevFat = dailyInfos[0].currentFat;
        }
      });
  }

  editMemo() {
    this.editingMemo = true;
  }

  updateMemo() {
    this.editingMemo = false;
    this.dailyInfoService.updateDailyInfoMemo(
      this.userId,
      this.today,
      this.form.value.dailyMemo
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
