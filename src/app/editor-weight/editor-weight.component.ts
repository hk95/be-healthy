import { Component, OnInit, Input } from '@angular/core';
import { DailyInfo } from '../interfaces/daily-info';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DailyInfoService } from '../services/daily-info.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AverageService } from '../services/average.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-editor-weight',
  templateUrl: './editor-weight.component.html',
  styleUrls: ['./editor-weight.component.scss'],
})
export class EditorWeightComponent implements OnInit {
  @Input() dailyInfo: DailyInfo;
  date: string;
  today: string = this.getDate();
  dailyInfo$: Observable<DailyInfo>;
  previousDailyInfo$: Observable<DailyInfo[]>;

  form = this.fb.group({
    currentWeight: ['', [Validators.required]],
    currentFat: ['', [Validators.required]],
    dailyMemo: [''],
  });

  constructor(
    private fb: FormBuilder,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private averageService: AverageService,
    private datePipe: DatePipe
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.date = params.get('date');
      this.dailyInfoService
        .getDailyInfo(this.authService.uid, this.date)
        .subscribe((dailyInfo) => {
          if (dailyInfo.currentWeight) {
            this.form.patchValue(dailyInfo);
          } else {
            console.log('latatstData');
            this.getPreviuosWeightAndFat();
          }
        });
    });
  }
  updateSubmit() {
    const formData = this.form.value;
    this.dailyInfoService.updateDailyInfoBody({
      date: this.date,
      currentWeight: formData.currentWeight,
      currentFat: formData.currentFat,
      dailyMemo: formData.dailyMemo,
      authorId: this.authService.uid,
    });
    this.averageService.averageWeightAndFat(
      this.authService.uid,
      this.date,
      formData.currentWeight,
      formData.currentFat
    );
  }
  back() {
    this.location.back();
  }

  private getPreviuosWeightAndFat() {
    this.dailyInfoService
      .getPreviousDailyInfo(this.authService.uid, this.today)
      .subscribe((dailyInfos?: DailyInfo[]) => {
        this.form.patchValue(dailyInfos[0]);
      });
  }
  getDate() {
    const d = new Date();
    return this.datePipe.transform(d, 'yy.MM.dd(E)');
  }

  ngOnInit(): void {}
}
