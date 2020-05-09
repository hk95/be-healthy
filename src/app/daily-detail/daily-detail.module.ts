import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyDetailRoutingModule } from './daily-detail-routing.module';
import { DailyDetailComponent } from './daily-detail.component';


@NgModule({
  declarations: [DailyDetailComponent],
  imports: [
    CommonModule,
    DailyDetailRoutingModule
  ]
})
export class DailyDetailModule { }
