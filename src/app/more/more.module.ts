import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more/more.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { TermsComponent } from './terms/terms.component';
import { LegalComponent } from './legal/legal.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { UsageComponent } from './usage/usage.component';
import { UsageTopComponent } from './usage-top/usage-top.component';
import { UsageMenuComponent } from './usage-menu/usage-menu.component';
import { UsageMealComponent } from './usage-meal/usage-meal.component';
import { UsageGraphComponent } from './usage-graph/usage-graph.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
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
