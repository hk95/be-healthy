import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { RecipeDetailComponent } from './recipe-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [
    CommonModule,
    RecipeDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class RecipeDetailModule {}
