import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: 'top',
    loadChildren: () => import('./top/top.module').then((m) => m.TopModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then((m) => m.EditModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      canLoad: [GuestGuard],
      canActivate: [GuestGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
