import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing/billing.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BillingComponent, InvoiceComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class BillingModule {}
