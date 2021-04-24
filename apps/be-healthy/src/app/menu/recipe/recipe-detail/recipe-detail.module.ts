import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { RecipeDetailComponent } from './recipe-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [
    CommonModule,
    RecipeDetailRoutingModule,
    MatDialogModule,
    SharedModule,
  ],
})
export class RecipeDetailModule {}
