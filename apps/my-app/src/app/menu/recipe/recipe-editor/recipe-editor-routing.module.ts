import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGuard } from '../../../guards/form.guard';
import { RecipeEditorComponent } from './recipe-editor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeEditorComponent,
    canDeactivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeEditorRoutingModule {}
