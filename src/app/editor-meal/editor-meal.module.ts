import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorMealRoutingModule } from './editor-meal-routing.module';
import { EditorMealComponent } from './editor-meal/editor-meal.component';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodSearchComponent } from './food-search/food-search.component';
import { MySetComponent } from './my-set/my-set.component';
import { SelectedFoodsComponent } from './selected-foods/selected-foods.component';
import { MatCardModule } from '@angular/material/card';

import { FavFoodsComponent } from './fav-foods/fav-foods.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';
import { SharedModule } from '../shared/shared.module';
import { FoodSearchModule } from '../food-search/food-search.module';

@NgModule({
  declarations: [
    EditorMealComponent,
    FoodSearchComponent,
    MySetComponent,
    SelectedFoodsComponent,
    FavFoodsComponent,
  ],
  imports: [
    CommonModule,
    EditorMealRoutingModule,
    MatTabsModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatBadgeModule,
    SharedModule,
    FoodSearchModule,
  ],
})
export class EditorMealModule {}
