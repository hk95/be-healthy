import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorBreakfastRoutingModule } from './editor-meal-routing.module';
import { EditorMealComponent } from './editor-meal/editor-meal.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FoodSearchComponent } from './food-search/food-search.component';
import { NgAisModule } from 'angular-instantsearch';
import { MySetComponent } from './my-set/my-set.component';
import { SelectedFoodsComponent } from './selected-foods/selected-foods.component';
import { MatCardModule } from '@angular/material/card';

import { FavFoodsComponent } from './fav-foods/fav-foods.component';

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
    EditorBreakfastRoutingModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    MatButtonModule,
    NgAisModule,
    MatCardModule,
  ],
})
export class EditorBreakfastModule {}
