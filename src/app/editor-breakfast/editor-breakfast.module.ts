import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorBreakfastRoutingModule } from './editor-breakfast-routing.module';
import { EditorBreakfastComponent } from './editor-breakfast/editor-breakfast.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorBreakfastComponent],
  imports: [
    CommonModule,
    EditorBreakfastRoutingModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class EditorBreakfastModule {}
