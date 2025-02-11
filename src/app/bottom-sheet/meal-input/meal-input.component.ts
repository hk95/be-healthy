import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { Food } from 'src/app/interfaces/food';
import { Set } from 'src/app/interfaces/set';
import { DailyInfoService } from 'src/app/services/daily-info.service';

@Component({
  selector: 'app-meal-input',
  templateUrl: './meal-input.component.html',
  styleUrls: ['./meal-input.component.scss'],
})
export class MealInputComponent implements OnInit {
  amount: number;
  amountForm = this.fb.group({
    amount: [
      '',
      [
        Validators.min(this.data.minAmount),
        Validators.max(this.data.maxAmount),
        Validators.required,
      ],
    ],
  });
  get amountControl(): UntypedFormControl {
    return this.amountForm.get('amount') as UntypedFormControl;
  }
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      date: string;
      userId?: string;
      maxAmount: number;
      minAmount: number;
      food: Food;
      set: Set;
    },
    private dailyInfoService: DailyInfoService,
    private fb: UntypedFormBuilder,
    public bottomSheetRef: MatBottomSheetRef<MealInputComponent>
  ) {}

  addFood(amount: number) {
    if (amount >= 0) {
      const meal: DailyMeal = {
        mealId: '',
        food: this.data.food ? this.data.food : null,
        set: this.data.set ? this.data.set : null,
        amount,
      };
      this.dailyInfoService.addMeal(
        meal,
        this.data.userId,
        this.data.date,
        this.data.food ? 'food' : 'set'
      );
    }
    this.bottomSheetRef.dismiss();
  }

  ngOnInit(): void {}
}
