import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeEditorRoutingModule } from './recipe-editor-routing.module';
import { RecipeEditorComponent } from './recipe-editor.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';

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
