import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';

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
  today: number = Date.now();
  id: string;
  constructor(
    private fb: FormBuilder,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  CreateSubmit() {
    const formData = this.form.value;
    this.dailyInfoService.createDailyInfo({
      userId: this.authService.uid,
      weight: formData.weight,
      fat: formData.fat,
      totalCal: formData.meal,
      today: this.today,
    });
  }
}
