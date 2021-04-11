import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MatTabsModule } from '@angular/material/tabs';

import { SetComponent } from './set/set.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MenuComponent, SetComponent, RecipeComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class MenuModule {}
