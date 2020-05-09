import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyDetailComponent } from './daily-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DailyDetailComponent,
  },
  {
    path: ':id',
    component: DailyDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyDetailRoutingModule {}
