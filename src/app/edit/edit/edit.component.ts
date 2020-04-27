import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DailyInfoService } from 'src/app/services/daily-info.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form = this.fb.group({
    weight: ['', [Validators.required]],
    fat: ['', [Validators.required]],
    meal: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private dailyInfoService: DailyInfoService
  ) {}

  ngOnInit(): void {}

  submit() {
    const formData = this.form.value;
    this.dailyInfoService.editDailyInfo({
      id: 1,
      name: 'test',
      weight: formData.weight,
      fat: formData.fat,
      totalCal: formData.meal,
    });
  }
}
