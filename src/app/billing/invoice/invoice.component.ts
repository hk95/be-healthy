import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChargeWithInvoice } from '@interfaces/charge';
import { PaymentService } from 'src/app/services/payment.service';
import { Subscription } from 'rxjs';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit, OnDestroy {
  invoices: ChargeWithInvoice[];
  startingAfter: string;
  endingBefore: string;
  page = 0;
  hasNext: boolean;
  loading: boolean;
  paymentSub: Subscription;

  constructor(
    private paymentService: PaymentService,
    private mainShellService: MainShellService
  ) {
    this.getInvoices();
  }

  private getInvoices(params?: {
    startingAfter?: string;
    endingBefore?: string;
  }) {
    this.loading = true;
    this.paymentService.getInvoices(params).then((result) => {
      this.hasNext = !!params?.endingBefore || result?.has_more;
      this.invoices = result?.data;
      this.loading = false;
    });
  }

  nextPage() {
    this.page++;
    this.getInvoices({
      startingAfter: this.invoices[this.invoices.length - 1].id,
    });
  }

  prevPage() {
    this.page--;
    this.getInvoices({
      endingBefore: this.invoices[0].id,
    });
  }

  ngOnInit(): void {
    this.paymentSub = this.mainShellService.paymentCompleted$.subscribe(() => {
      this.getInvoices();
    });
  }
  ngOnDestroy(): void {
    this.paymentSub.unsubscribe();
  }
}
