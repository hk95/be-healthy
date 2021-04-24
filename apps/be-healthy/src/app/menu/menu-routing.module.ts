import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SetComponent } from './set/set.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'set-list',
        component: SetComponent,
      },
      {
        path: 'recipe-list',
        component: RecipeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
