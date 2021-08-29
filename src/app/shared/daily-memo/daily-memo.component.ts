import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DailyInfo } from 'src/app/interfaces/daily-info';
import { AuthService } from 'src/app/services/auth.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';

@Component({
  selector: 'app-daily-memo',
  templateUrl: './daily-memo.component.html',
  styleUrls: ['./daily-memo.component.scss'],
})
export class DailyMemoComponent implements OnChanges {
  @Input()
  dailyInfo?: DailyInfo;

  readonly maxMemoLength = 500;
  private readonly userId = this.authService.uid;

  isEditing: boolean;

  formMemo = this.fb.group({
    dailyMemo: ['', [Validators.maxLength(this.maxMemoLength)]],
  });

  get memoControl(): FormControl {
    return this.formMemo.get('dailyMemo') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dailyInfo) {
      this.formMemo.patchValue(this.dailyInfo);
    }
  }

  submitMemo(): void {
    this.dailyInfoService.updateDailyInfoMemo(
      this.userId,
      this.dailyInfo.date,
      this.formMemo.value.dailyMemo
    );
    this.isEditing = false;
  }
}
