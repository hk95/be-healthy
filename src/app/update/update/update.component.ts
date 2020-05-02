import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { ActivatedRoute } from '@angular/router';

import { switchMap, take } from 'rxjs/operators';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  id: string;

  form = this.fb.group({
    weight: ['', [Validators.required]],
    fat: ['', [Validators.required]],
    totalCal: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private dailyInfoService: DailyInfoService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.id = params.get('id');

      this.dailyInfoService.getDailyInfo(this.id).subscribe((user) => {
        if (user) {
          this.form.patchValue(user);
          console.log('wataru');
        } else {
          console.log('errore');
        }
      });
    });
  }
  ngOnInit() {}

  updateSubmit() {
    const formData = this.form.value;
    this.dailyInfoService.upadateDailyInfo({
      weight: formData.weight,
      fat: formData.fat,
      totalCal: formData.totalCal,
      id: this.id
    });
  }
}
