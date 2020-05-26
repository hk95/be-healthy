import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorListRoutingModule } from './editor-list-routing.module';
import { EditorListComponent } from './editor-list/editor-list.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [EditorListComponent],
  imports: [
    CommonModule,
    EditorListRoutingModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class EditorListModule {}
