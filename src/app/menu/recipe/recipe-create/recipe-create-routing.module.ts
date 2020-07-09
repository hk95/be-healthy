import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeCreateComponent } from './recipe-create.component';
import { FormGuard } from 'src/app/guards/form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeCreateComponent,
    canDeactivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeCreateRoutingModule {}
