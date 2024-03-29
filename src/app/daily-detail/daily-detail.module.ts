import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyDetailRoutingModule } from './daily-detail-routing.module';
import { DailyDetailComponent } from './daily-detail.component';
import { MatCardModule } from '@angular/material/card';
import { NutritionPipe } from '../pipes/nutrition.pipe';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PfcBalancePipe } from '../pipes/pfc-balance.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';
import { MealResultListComponent } from './meal-result-list/meal-result-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { DailyMemoModule } from '../shared/daily-memo/daily-memo.module';

@NgModule({
  declarations: [
    DailyDetailComponent,
    NutritionPipe,
    PfcBalancePipe,
    MealResultListComponent,
  ],
  imports: [
    CommonModule,
    DailyDetailRoutingModule,
    MatCardModule,
    MatTableModule,
    NgxChartsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    SharedModule,
    MatDividerModule,
    DailyMemoModule,
  ],
})
export class DailyDetailModule {}
