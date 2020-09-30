import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorMealRoutingModule } from './editor-meal-routing.module';
import { EditorMealComponent } from './editor-meal/editor-meal.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodSearchComponent } from './food-search/food-search.component';
import { NgAisModule } from 'angular-instantsearch';
import { MySetComponent } from './my-set/my-set.component';
import { SelectedFoodsComponent } from './selected-foods/selected-foods.component';
import { MatCardModule } from '@angular/material/card';

import { FavFoodsComponent } from './fav-foods/fav-foods.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

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
    MatIconModule,
    MatTabsModule,
    FormsModule,
    MatButtonModule,
    NgAisModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBottomSheetModule,
  ],
})
export class EditorMealModule {}
