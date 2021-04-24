import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeEditorComponent } from './recipe-editor.component';
import { FormGuard } from 'src/app/guards/form.guard';

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
