import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form = this.fb.group({
    currentWeight: ['', [Validators.required]],
    currentFat: ['', [Validators.required]],
    dailyMemo: [''],
  });
  date: string = this.getDate();
  constructor(
    private fb: FormBuilder,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {}
  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }

  CreateSubmit() {
    const formData = this.form.value;
    this.dailyInfoService.createDailyInfo({
      authorId: this.authService.uid,
      date: this.date,
      currentWeight: formData.currentWeight,
      currentFat: formData.currentFat,
      dailyMemo: formData.dailyMemo,
    });
  }
}
