import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeEditorRoutingModule } from './recipe-editor-routing.module';
import { RecipeEditorComponent } from './recipe-editor.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [RecipeEditorComponent],
  imports: [
    CommonModule,
    RecipeEditorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    ImageCropperModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class RecipeEditorModule {}
