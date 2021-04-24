import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetEditorRoutingModule } from './set-editor-routing.module';
import { SetEditorComponent } from './set-editor.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgAisModule } from 'angular-instantsearch';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SetEditorComponent],
  imports: [
    CommonModule,
    SetEditorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgAisModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatExpansionModule,
    SharedModule,
  ],
})
export class SetEditorModule {}
