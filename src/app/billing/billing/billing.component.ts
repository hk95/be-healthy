import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreditCardComponent } from 'src/app/dialogs/credit-card/credit-card.component';

import { AuthService } from 'src/app/services/auth.service';
import Stripe from 'stripe';
import { Subscription } from 'rxjs';
import { MainShellService } from 'src/app/services/main-shell.service';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy {
  donationForm = this.fb.group({
    donationAmount: [
      '',
      [Validators.required, Validators.min(100), Validators.max(100000)],
    ],
  });
  paymentMethods: Stripe.PaymentMethod[];
  cardBrand: string;
  user$ = this.userService.getUser(this.authService.uid);

  private sub: Subscription;
  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private mainShellService: MainShellService,
    private userService: UserService
  ) {
    this.mainShellService.setTitle('開発者を支援');
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
  get donationAmountControl() {
    return this.donationForm.get('donationAmount') as FormControl;
  }

  openCreditCardDialog() {
    const dialogRef = this.dialog.open(CreditCardComponent, {
      data: { paymentMethods: this.paymentMethods },
    });

    this.sub = dialogRef.afterClosed().subscribe((result) => {
      this.getCards();
    });
  }
  openConfirmDialog(funcitonTitle: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.sub = dialogRef.afterClosed().subscribe((result: boolean) => {
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
  }
  private chargePremiumPlan() {
    this.paymentService.chargePremiumPlan(
      'price_1HHq4xEM1ZTRJUunj6AY9MzM',
      this.authService.uid
    );
  }
  private donate() {
    console.log('donationRun', this.donationForm.value.donationAmount);
    this.paymentService.donate(this.donationForm.value.donationAmount);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
