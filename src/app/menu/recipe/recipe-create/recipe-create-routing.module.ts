import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeCreateComponent } from './recipe-create.component';
import { RecipeFormGuard } from 'src/app/guards/recipe-form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeCreateComponent,
    canDeactivate: [RecipeFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeCreateRoutingModule {}
