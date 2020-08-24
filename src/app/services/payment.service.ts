import { Injectable } from '@angular/core';
import {
  loadStripe,
  Stripe as StripeClient,
  StripeCardElement,
} from '@stripe/stripe-js';
import Stripe from 'stripe';
import { environment } from 'src/environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    console.log('run');
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
        console.log('servicesetUpOk');
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
    console.log('deleting');

    const callable = this.fns.httpsCallable('deleteStripePaymentMethod');
    return callable({ id })
      .toPromise()
      .then(() => {
        console.log('deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPaymentMethods(): Promise<Stripe.ApiList<Stripe.PaymentMethod>> {
    const callable = this.fns.httpsCallable('getPaymentMethods');
    return callable({}).toPromise();
  }
}
