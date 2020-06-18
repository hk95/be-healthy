import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeUpdateComponent } from './recipe-update.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeUpdateRoutingModule {}
