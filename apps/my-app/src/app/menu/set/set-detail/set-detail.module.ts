import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetDetailRoutingModule } from './set-detail-routing.module';
import { SetDetailComponent } from './set-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [SetDetailComponent],
  imports: [
    CommonModule,
    SetDetailRoutingModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class SetDetailModule {}
