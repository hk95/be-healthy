import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeEditorRoutingModule } from './recipe-editor-routing.module';
import { RecipeEditorComponent } from './recipe-editor.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';

@NgModule({
  declarations: [RecipeEditorComponent],
  imports: [
    CommonModule,
    RecipeEditorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    ImageCropperComponent,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class RecipeEditorModule {}
