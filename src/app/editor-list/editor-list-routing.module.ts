import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorListComponent } from './editor-list/editor-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditorListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorListRoutingModule {}
