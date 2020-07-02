import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetCreateComponent } from './set-create.component';
import { RecipeFormGuard } from 'src/app/guards/recipe-form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SetCreateComponent,
    canDeactivate: [RecipeFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetCreateRoutingModule {}
