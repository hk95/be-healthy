import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import Stripe from 'stripe';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { MainShellService } from '../../services/main-shell.service';
import { CreditCardComponent } from '../../dialogs/credit-card/credit-card.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  paymentMethods: Stripe.PaymentMethod[];
  cardBrand: string;
  maxAmount = 100000;
  minAmount = 100;
  donationForm = this.fb.group({
    donationAmount: [
      '',
      [
        Validators.required,
        Validators.min(this.minAmount),
        Validators.max(this.maxAmount),
      ],
    ],
  });
  noGetList: number[];
  get donationAmountControl() {
    return this.donationForm.get('donationAmount') as FormControl;
  }

  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private mainShellService: MainShellService
  ) {
    this.mainShellService.title = this.mainShellService.PAGE_TITLES.donation;
    this.getCards();
  }

  private getCards() {
    this.paymentService.getPaymentMethods().then((methods) => {
      this.paymentMethods = methods.data;
      if (this.paymentMethods && this.paymentMethods.length) {
        switch (this.paymentMethods[0].card.brand) {
          case 'diners':
            this.cardBrand = 'diners-club';
            break;
          default:
            this.cardBrand = this.paymentMethods[0].card.brand;
        }
      }
    });
  }

  openCreditCardDialog() {
    const dialogRef = this.dialog.open(CreditCardComponent, {
      data: { paymentMethods: this.paymentMethods },
    });

    const sub = dialogRef.afterClosed().subscribe((result) => {
      this.getCards();
    });
    this.subscription.add(sub);
  }

  openConfirmDialog(funcitonTitle: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    const sub = dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        switch (funcitonTitle) {
          case 'donation':
            this.donate();
            break;
          case 'premiumPlan':
            this.chargePremiumPlan();
            break;
        }
      }
    });
    this.subscription.add(sub);
  }

  private chargePremiumPlan() {
    this.paymentService
      .chargePremiumPlan(environment.stripe.price, this.authService.uid)
      .then(() => {
        this.mainShellService.paymentCompleted();
      });
  }

  private donate() {
    this.paymentService
      .donate(this.donationForm.value.donationAmount)
      .then(() => {
        this.mainShellService.paymentCompleted();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
