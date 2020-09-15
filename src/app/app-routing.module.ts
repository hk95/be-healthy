import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { MainShellComponent } from './main-shell/main-shell.component';
import { OtherShellComponent } from './other-shell/other-shell.component';
import { WelcomeShellComponent } from './welcome-shell/welcome-shell.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
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
    path: 'recipe-editor',
    loadChildren: () =>
      import('./menu/recipe/recipe-editor/recipe-editor.module').then(
        (m) => m.RecipeEditorModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'set-editor',
    loadChildren: () =>
      import('./menu/set/set-editor/set-editor.module').then(
        (m) => m.SetEditorModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'set-detail',
    loadChildren: () =>
      import('./menu/set/set-detail/set-detail.module').then(
        (m) => m.SetDetailModule
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
        path: 'editor-weight',
        loadChildren: () =>
          import('./editor-weight/editor-weight.module').then(
            (m) => m.EditorWeightModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'daily-detail',
        loadChildren: () =>
          import('./daily-detail/daily-detail.module').then(
            (m) => m.DailyDetailModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'editor-meal',
        loadChildren: () =>
          import('./editor-meal/editor-meal.module').then(
            (m) => m.EditorMealModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'graph',
        loadChildren: () =>
          import('./graph/graph.module').then((m) => m.GraphModule),
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
      {
        path: 'billing',
        loadChildren: () =>
          import('./billing/billing.module').then((m) => m.BillingModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
