import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorWeightComponent } from './editor-weight.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditorWeightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorWeightRoutingModule {}
