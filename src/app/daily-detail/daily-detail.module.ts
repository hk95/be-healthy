import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyDetailRoutingModule } from './daily-detail-routing.module';
import { DailyDetailComponent } from './daily-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NutritionPipe } from '../pipes/nutrition.pipe';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DailyDetailComponent, NutritionPipe],
  imports: [
    CommonModule,
    DailyDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    NgxChartsModule,
  ],
})
export class DailyDetailModule {}
