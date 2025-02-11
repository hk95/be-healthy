import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetDetailRoutingModule } from './set-detail-routing.module';
import { SetDetailComponent } from './set-detail.component';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';

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
