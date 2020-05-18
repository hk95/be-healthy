import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorBreakfastComponent } from './editor-breakfast/editor-breakfast.component';

const routes: Routes = [
  {
    path: '',
    component: EditorBreakfastComponent,
  },
  {
    path: ':id',
    component: EditorBreakfastComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorBreakfastRoutingModule {}
