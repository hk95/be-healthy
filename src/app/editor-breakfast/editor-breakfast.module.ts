import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorBreakfastRoutingModule } from './editor-breakfast-routing.module';
import { EditorBreakfastComponent } from './editor-breakfast/editor-breakfast.component';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [EditorBreakfastComponent],
  imports: [CommonModule, EditorBreakfastRoutingModule, MatTabsModule],
})
export class EditorBreakfastModule {}
