import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more/more.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { TermsComponent } from './terms/terms.component';
import { LegalComponent } from './legal/legal.component';
import { ContactComponent } from './contact/contact.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsageComponent } from './usage/usage.component';
import { UsageTopComponent } from './usage-top/usage-top.component';

@NgModule({
  declarations: [
    MoreComponent,
    ProfileComponent,
    AccountComponent,
    TermsComponent,
    LegalComponent,
    ContactComponent,
    UsageComponent,
    UsageTopComponent,
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MoreModule {}
