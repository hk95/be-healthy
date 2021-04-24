import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGuard } from '../../../guards/form.guard';

import { SetEditorComponent } from './set-editor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SetEditorComponent,
    canDeactivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetEditorRoutingModule {}
