import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorMealComponent } from './editor-meal/editor-meal.component';

const routes: Routes = [
  {
    path: '',
    component: EditorMealComponent,
  },
  {
    path: ':id',
    component: EditorMealComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorBreakfastRoutingModule {}
