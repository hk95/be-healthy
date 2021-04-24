import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { DailyMeal } from '../../interfaces/daily-info';
import { Food } from '../../interfaces/food';
import { Set } from '../../interfaces/set';
import { DailyInfoService } from '../../services/daily-info.service';

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
  get amountControl(): FormControl {
    return this.amountForm.get('amount') as FormControl;
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
    private fb: FormBuilder,
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
