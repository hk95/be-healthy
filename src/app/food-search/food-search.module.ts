import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodSearchFormComponent } from './food-search-form/food-search-form.component';
import { SharedModule } from '../shared/shared.module';

import { FoodSearchContentComponent } from './food-search-content/food-search-content.component';
import { FoodListForMealComponent } from './food-list-for-meal/food-list-for-meal.component';
import { FoodListForSetComponent } from './food-list-for-set/food-list-for-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

@NgModule({
  declarations: [
    FoodSearchFormComponent,
    FoodSearchContentComponent,
    FoodListForMealComponent,
    FoodListForSetComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [FoodSearchContentComponent],
})
export class FoodSearchModule {}
