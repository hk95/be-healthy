import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorWeightRoutingModule } from './editor-weight-routing.module';
import { EditorWeightComponent } from './editor-weight.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EditorWeightComponent],
  imports: [
    CommonModule,
    EditorWeightRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EditorWeightModule {}
