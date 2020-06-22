import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeUpdateRoutingModule } from './recipe-update-routing.module';
import { RecipeUpdateComponent } from './recipe-update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RecipeFormGuard } from 'src/app/guards/recipe-form.guard';

@NgModule({
  declarations: [RecipeUpdateComponent],
  imports: [
    CommonModule,
    RecipeUpdateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    ImageCropperModule,
  ],
})
export class RecipeUpdateModule {}
