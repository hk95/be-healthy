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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class RecipeUpdateModule {}
