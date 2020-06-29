import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorBreakfastRoutingModule } from './editor-breakfast-routing.module';
import { EditorBreakfastComponent } from './editor-breakfast/editor-breakfast.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FoodSearchComponent } from './food-search/food-search.component';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [EditorBreakfastComponent, FoodSearchComponent],
  imports: [
    CommonModule,
    EditorBreakfastRoutingModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    MatButtonModule,
    NgAisModule,
  ],
})
export class EditorBreakfastModule {}
