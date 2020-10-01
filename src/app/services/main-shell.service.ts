import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DailyMeal } from '../interfaces/daily-info';

@Injectable({
  providedIn: 'root',
})
export class MainShellService {
  titleSource = new ReplaySubject<string>();
  title$ = this.titleSource.asObservable();
  titleMealSource = new ReplaySubject<string>();
  titleMeal$ = this.titleMealSource.asObservable();
  selectedMealsSource = new ReplaySubject<DailyMeal[]>();
  selectedMeals = this.selectedMealsSource.asObservable();
  paymentCompletedSource = new ReplaySubject<void>();
  paymentCompleted$ = this.paymentCompletedSource.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.titleSource.next(title);
  }

  setTitleMeal(titleMeal: string) {
    this.titleMealSource.next(titleMeal);
  }

  setSelectedMeals(selectedMeals: DailyMeal[]) {
    this.selectedMealsSource.next(selectedMeals);
  }

  paymentCompleted() {
    this.paymentCompletedSource.next();
  }
}
