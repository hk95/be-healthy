import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetDetailComponent } from './set-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SetDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetDetailRoutingModule {}
