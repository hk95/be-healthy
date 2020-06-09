import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeCreateRoutingModule } from './recipe-create-routing.module';
import { RecipeCreateComponent } from './recipe-create.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RecipeCreateComponent],
  imports: [
    CommonModule,
    RecipeCreateRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class RecipeCreateModule {}
