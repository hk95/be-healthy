import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyDetailRoutingModule } from './daily-detail-routing.module';
import { DailyDetailComponent } from './daily-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NutritionPipe } from '../pipes/nutrition.pipe';

@NgModule({
  declarations: [DailyDetailComponent, NutritionPipe],
  imports: [
    CommonModule,
    DailyDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DailyDetailModule {}
