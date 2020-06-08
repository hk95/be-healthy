import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SetComponent } from './set/set.component';
import { RecipeComponent } from './recipe/recipe.component';

@NgModule({
  declarations: [MenuComponent, SetComponent, RecipeComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MenuModule {}
