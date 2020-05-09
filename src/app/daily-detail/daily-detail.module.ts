import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyDetailRoutingModule } from './daily-detail-routing.module';
import { DailyDetailComponent } from './daily-detail.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DailyDetailComponent],
  imports: [CommonModule, DailyDetailRoutingModule, MatButtonModule],
})
export class DailyDetailModule {}
