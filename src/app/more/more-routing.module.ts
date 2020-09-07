import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreComponent } from './more/more.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { TermsComponent } from './terms/terms.component';
import { LegalComponent } from './legal/legal.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MoreComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreRoutingModule {}
