import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorBreakfastRoutingModule } from './editor-breakfast-routing.module';
import { EditorBreakfastComponent } from './editor-breakfast/editor-breakfast.component';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorBreakfastComponent],
  imports: [
    CommonModule,
    EditorBreakfastRoutingModule,
    MatTabsModule,
    FormsModule,
  ],
})
export class EditorBreakfastModule {}
