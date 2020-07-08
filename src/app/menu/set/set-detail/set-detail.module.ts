import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetDetailRoutingModule } from './set-detail-routing.module';
import { SetDetailComponent } from './set-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SetDetailComponent],
  imports: [
    CommonModule,
    SetDetailRoutingModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SetDetailModule {}
