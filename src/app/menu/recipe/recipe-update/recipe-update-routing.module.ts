import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeUpdateComponent } from './recipe-update.component';
import { RecipeFormGuard } from 'src/app/guards/recipe-form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeUpdateComponent,
    canDeactivate: [RecipeFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeUpdateRoutingModule {}
