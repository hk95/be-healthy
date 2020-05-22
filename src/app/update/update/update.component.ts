import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute } from '@angular/router';

import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { DailyInfo } from 'src/app/interfaces/daily-info';
import { Location } from '@angular/common';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  @Input() dailyInfo: DailyInfo;
  dailyId: string;
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
    private location: Location
  ) {
    this.route.paramMap.subscribe((params) => {
      this.dailyId = params.get('id');
      this.dailyInfoService
        .getDailyInfo(this.authService.uid, this.dailyId)
        .subscribe((dailyInfo) => {
          if (dailyInfo) {
            this.form.patchValue(dailyInfo);
            console.log('wataru');
          } else {
            console.log('error');
          }
        });
    });
    // this.route.queryParamMap.subscribe((params) => {
    //   const id = params.get('id');

    //   this.dailyInfoService
    //     .getDailyInfo(this.authService.uid, id)
    //     .subscribe((user) => {
    //       if (user) {
    //         this.form.patchValue(user);
    //         console.log('wataru');
    //       } else {
    //         console.log('error');
    //       }
    //     });
    // });
  }
  ngOnInit() {}

  updateSubmit() {
    const formData = this.form.value;
    this.dailyInfoService.updateDailyInfo({
      dailyId: this.dailyId,
      currentWeight: formData.currentWeight,
      currentFat: formData.currentFat,
      dailyMemo: formData.dailyMemo,
      authorId: this.authService.uid,
    });
  }
  back() {
    this.location.back();
  }
}
