import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyMemoComponent } from './daily-memo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [DailyMemoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
  ],
  exports: [DailyMemoComponent],
})
export class DailyMemoModule {}
