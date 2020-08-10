import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { DailyInfo } from 'src/app/interfaces/daily-info';
import { Location } from '@angular/common';
import { AverageService } from 'src/app/services/average.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  @Input() dailyInfo: DailyInfo;
  date: string;
  dailyInfo$: Observable<DailyInfo>;

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
    private averageService: AverageService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.date = params.get('date');
      this.dailyInfoService
        .getDailyInfo(this.authService.uid, this.date)
        .subscribe((dailyInfo) => {
          if (dailyInfo) {
            this.form.patchValue(dailyInfo);
          } else {
            console.log('error');
          }
        });
    });
  }
  ngOnInit() {}

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
}
