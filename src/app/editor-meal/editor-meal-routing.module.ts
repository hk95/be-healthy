import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorMealComponent } from './editor-meal/editor-meal.component';
import { MySetComponent } from './my-set/my-set.component';
import { FoodSearchComponent } from './food-search/food-search.component';
import { SelectedFoodsComponent } from './selected-foods/selected-foods.component';
import { FavFoodsComponent } from './fav-foods/fav-foods.component';

const routes: Routes = [
  {
    path: '',
    component: EditorMealComponent,
    children: [
      {
        path: 'search',
        component: FoodSearchComponent,
      },
      {
        path: 'fav-foods',
        component: FavFoodsComponent,
      },
      {
        path: 'my-set',
        component: MySetComponent,
      },
      {
        path: 'selected-foods',
        component: SelectedFoodsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorMealRoutingModule {}
