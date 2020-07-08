import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeUpdateComponent } from './recipe-update.component';
import { FormGuard } from 'src/app/guards/form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeUpdateComponent,
    canDeactivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeUpdateRoutingModule {}
