import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetCreateComponent } from './set-create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SetCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetCreateRoutingModule {}
