import { Injectable } from '@angular/core';
import {
  loadStripe,
  Stripe as StripeClient,
  StripeCardElement,
} from '@stripe/stripe-js';
import Stripe from 'stripe';
import { environment } from 'src/environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChargeWithInvoice } from '@interfaces/charge';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private fns: AngularFireFunctions,
    private snackBar: MatSnackBar,
    private db: AngularFirestore
  ) {}

  async getStripeClient(): Promise<StripeClient> {
    return loadStripe(environment.stripe.publicKey);
  }

  async setPaymemtMethod(
    client: StripeClient,
    card: StripeCardElement,
    name: string,
    email: string,
    paymentMethodId?: string
  ): Promise<void> {
    const intent = await this.createStripeSetupIntent();
    if (paymentMethodId) {
      await this.deleteStripePaymentMethod(paymentMethodId);
    }
    const { setupIntent, error } = await client.confirmCardSetup(
      intent.client_secret,
      {
        payment_method: {
          card,
          billing_details: {
            name,
            email,
          },
        },
      }
    );
    if (error) {
      throw new Error(error.code);
    } else {
      if (setupIntent.status === 'succeeded') {
        const callable = this.fns.httpsCallable('setStripePaymentMethod');
        return callable({
          paymentMethod: setupIntent.payment_method,
        }).toPromise();
      }
    }
  }

  private createStripeSetupIntent(): Promise<Stripe.SetupIntent> {
    const callable = this.fns.httpsCallable('createStripeSetupIntent');
    return callable({}).toPromise();
  }

  deleteStripePaymentMethod(id: string): Promise<void> {
    const callable = this.fns.httpsCallable('deleteStripePaymentMethod');
    return callable({ id }).toPromise();
  }

  getPaymentMethods(): Promise<Stripe.ApiList<Stripe.PaymentMethod>> {
    const callable = this.fns.httpsCallable('getPaymentMethods');
    return callable({}).toPromise();
  }
  async chargePremiumPlan(priceId: string, userId: string): Promise<void> {
    const callable = this.fns.httpsCallable('payStripePremium');
    const process = this.snackBar.open('決済を開始します...', null, {
      duration: null,
    });
    return callable({
      priceId,
    })
      .toPromise()
      .then(() => {
        this.snackBar.open(
          '決済が完了しました。ご購入ありがとうございます。',
          null,
          {
            duration: 2000,
          }
        );
        this.db.doc(`users/${userId}`).set(
          {
            premiumPlan: true,
          },
          { merge: true }
        );
      })
      .catch((error) => {
        console.error(error?.message);
        this.snackBar.open(
          '決済に失敗しました。恐れ入りますが時間をおき再度お願いします。',
          null,
          {
            duration: 2000,
          }
        );
      })
      .finally(() => {
        process.dismiss();
      });
  }

  async donate(donationAmount: number): Promise<void> {
    const callable = this.fns.httpsCallable('donation');
    const process = this.snackBar.open('決済を開始します...', null, {
      duration: null,
    });
    return callable({
      donationAmount,
    })
      .toPromise()
      .then(() => {
        this.snackBar.open(
          '決済が完了しました。ありがとうございます！活動の励みになります！',
          null,
          {
            duration: 2000,
          }
        );
      })
      .catch((error) => {
        console.error(error?.message);
        this.snackBar.open(
          '決済に失敗しました。恐れ入りますが時間をおき再度お願いします。',
          null,
          {
            duration: 2000,
          }
        );
      })
      .finally(() => {
        process.dismiss();
      });
  }
  getInvoices(params?: {
    startingAfter?: string;
    endingBefore?: string;
    stripeAccountId?: string;
  }): Promise<Stripe.ApiList<ChargeWithInvoice>> {
    const callable = this.fns.httpsCallable('getStripeInvoices');
    return callable(params).toPromise();
  }
}
