import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { FullCalendarModule } from '@fullcalendar/angular';
import { DetailComponent } from './detail/detail.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { SharedModule } from '../shared/shared.module';
import { DailyMemoModule } from '../shared/daily-memo/daily-memo.module';

@NgModule({
  declarations: [TopComponent, DetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TopRoutingModule,
    MatCardModule,
    FullCalendarModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DailyMemoModule,
  ],
  providers: [DatePipe],
})
export class TopModule {}
