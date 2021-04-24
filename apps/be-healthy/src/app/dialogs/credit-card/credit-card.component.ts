import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from 'src/app/services/payment.service';
import { StripeCardElement, Stripe as StripeClient } from '@stripe/stripe-js';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  @ViewChild('cardElement') private cardElementRef: ElementRef;

  isComplete: boolean;
  loading = false;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(254)],
    ],
  });

  stripeClient: StripeClient;
  cardElement: StripeCardElement;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private dialogRef: MatDialogRef<CreditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data?
  ) {}
  async buildForm() {
    this.stripeClient = await this.paymentService.getStripeClient();

    const elements = this.stripeClient.elements();

    this.cardElement = elements.create('card');
    this.cardElement.mount(this.cardElementRef.nativeElement);
    this.cardElement.on(
      'change',
      (event) => (this.isComplete = event.complete)
    );
  }
  get formNameControl() {
    return this.form.get('name') as FormControl;
  }
  get formEmailControl() {
    return this.form.get('email') as FormControl;
  }

  createCard() {
    if (this.form.valid) {
      this.snackBar.open('カードを登録しています...', null, {
        duration: null,
      });

      this.paymentService
        .setPaymemtMethod(
          this.stripeClient,
          this.cardElement,
          this.form.value.name,
          this.form.value.email,
          this.data.paymentMethods[0]?.id
        )
        .then(() => {
          this.dialogRef.close();
          this.snackBar.open('カードを登録しました', null, {
            duration: 2000,
          });
        })
        .catch((error: Error) => {
          switch (error.message) {
            case 'expired_card':
              this.snackBar.open('カードの有効期限が切れています');
              break;
            default:
              this.snackBar.open('登録に失敗しました', null, {
                duration: 2000,
              });
          }
        })
        .finally(() => {
          this.loading = false;
          this.cardElement.clear();
        });
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }
}
