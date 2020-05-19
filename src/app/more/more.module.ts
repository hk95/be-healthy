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

@NgModule({
  declarations: [
    MoreComponent,
    ProfileComponent,
    AccountComponent,
    TermsComponent,
    LegalComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class MoreModule {}
