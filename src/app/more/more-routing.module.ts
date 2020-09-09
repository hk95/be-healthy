import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreComponent } from './more/more.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { TermsComponent } from './terms/terms.component';
import { LegalComponent } from './legal/legal.component';
import { UsageComponent } from './usage/usage.component';
import { UsageTopComponent } from './usage-top/usage-top.component';

const routes: Routes = [
  {
    path: '',
    component: MoreComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
    path: 'usage',
    component: UsageComponent,
    children: [
      {
        path: '',
        component: UsageTopComponent,
      },
      // {
      //   path: 'fav-foods',
      //   component: FavFoodsComponent,
      // },
      // {
      //   path: 'my-set',
      //   component: MySetComponent,
      // },
      // {
      //   path: 'selected-foods',
      //   component: SelectedFoodsComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreRoutingModule {}
