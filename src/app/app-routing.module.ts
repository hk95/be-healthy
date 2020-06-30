import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { MainShellComponent } from './main-shell/main-shell.component';
import { OtherShellComponent } from './other-shell/other-shell.component';
import { WelcomeShellComponent } from './welcome-shell/welcome-shell.component';

const routes: Routes = [
  {
    path: 'recipe-create',
    loadChildren: () =>
      import('./menu/recipe/recipe-create/recipe-create.module').then(
        (m) => m.RecipeCreateModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'recipe-detail',
    loadChildren: () =>
      import('./menu/recipe/recipe-detail/recipe-detail.module').then(
        (m) => m.RecipeDetailModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'recipe-update',
    loadChildren: () =>
      import('./menu/recipe/recipe-update/recipe-update.module').then(
        (m) => m.RecipeUpdateModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'set-create',
    loadChildren: () =>
      import('./menu/set/set-create/set-create.module').then(
        (m) => m.SetCreateModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'more',
    component: OtherShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./more/more.module').then((m) => m.MoreModule),
      },
    ],
  },
  {
    path: 'welcome',
    component: WelcomeShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule),
        canLoad: [GuestGuard],
        canActivate: [GuestGuard],
      },
    ],
  },
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./top/top.module').then((m) => m.TopModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./edit/edit.module').then((m) => m.EditModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },

      {
        path: 'update/:date',
        loadChildren: () =>
          import('./update/update.module').then((m) => m.UpdateModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'daily-detail/:date',
        loadChildren: () =>
          import('./daily-detail/daily-detail.module').then(
            (m) => m.DailyDetailModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'editor-list',
        loadChildren: () =>
          import('./editor-list/editor-list.module').then(
            (m) => m.EditorListModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'editor-breakfast/:date',
        loadChildren: () =>
          import('./editor-breakfast/editor-breakfast.module').then(
            (m) => m.EditorBreakfastModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
