import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetEditorRoutingModule } from './set-editor-routing.module';
import { SetEditorComponent } from './set-editor.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgAisModule } from 'angular-instantsearch';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [SetEditorComponent],
  imports: [
    CommonModule,
    SetEditorRoutingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgAisModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatExpansionModule,
  ],
})
export class SetEditorModule {}
