import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DailyMeal } from '../interfaces/daily-info';

@Injectable({
  providedIn: 'root',
})
export class MainShellService {
  private readonly titleSource = new ReplaySubject<string>();
  private readonly titleMealSource = new ReplaySubject<string>();
  private readonly selectedMealsSource = new ReplaySubject<DailyMeal[]>();
  private readonly paymentCompletedSource = new ReplaySubject<void>();

  title$ = this.titleSource.asObservable();
  titleMeal$ = this.titleMealSource.asObservable();
  selectedMeals = this.selectedMealsSource.asObservable();
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
