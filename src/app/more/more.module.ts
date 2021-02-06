import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more/more.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { TermsComponent } from './terms/terms.component';
import { LegalComponent } from './legal/legal.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { UsageComponent } from './usage/usage.component';
import { UsageTopComponent } from './usage-top/usage-top.component';
import { UsageMenuComponent } from './usage-menu/usage-menu.component';
import { UsageMealComponent } from './usage-meal/usage-meal.component';
import { UsageGraphComponent } from './usage-graph/usage-graph.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoreComponent,
    ProfileComponent,
    AccountComponent,
    TermsComponent,
    LegalComponent,
    UsageComponent,
    UsageTopComponent,
    UsageMenuComponent,
    UsageMealComponent,
    UsageGraphComponent,
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTabsModule,
    SharedModule,
  ],
})
export class MoreModule {}
