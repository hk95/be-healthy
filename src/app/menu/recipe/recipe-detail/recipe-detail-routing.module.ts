import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeDetailRoutingModule {}
