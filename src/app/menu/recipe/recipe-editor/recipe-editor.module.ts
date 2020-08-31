import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeEditorRoutingModule } from './recipe-editor-routing.module';
import { RecipeEditorComponent } from './recipe-editor.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [RecipeEditorComponent],
  imports: [
    CommonModule,
    RecipeEditorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    ImageCropperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class RecipeEditorModule {}
