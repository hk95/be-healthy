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
import { PfcBalancePipe } from '../pipes/pfc-balance.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [DailyDetailComponent, NutritionPipe, PfcBalancePipe],
  imports: [
    CommonModule,
    DailyDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    NgxChartsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
  ],
})
export class DailyDetailModule {}
