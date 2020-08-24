import { Component, OnInit, Input } from '@angular/core';
import { DailyInfo } from '../interfaces/daily-info';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DailyInfoService } from '../services/daily-info.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AverageService } from '../services/average.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editor-weight',
  templateUrl: './editor-weight.component.html',
  styleUrls: ['./editor-weight.component.scss'],
})
export class EditorWeightComponent implements OnInit {
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

  ngOnInit(): void {}
}
