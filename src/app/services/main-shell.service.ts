import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainShellService {
  titleSource = new ReplaySubject<string>();
  title$ = this.titleSource.asObservable();
  titleMealSource = new ReplaySubject<string>();
  titleMeal$ = this.titleMealSource.asObservable();
  paymentCompletedSource = new ReplaySubject<void>();
  paymentCompleted$ = this.paymentCompletedSource.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.titleSource.next(title);
  }
  setTitleMeal(titleMeal: string) {
    this.titleMealSource.next(titleMeal);
  }

  paymentCompleted() {
    this.paymentCompletedSource.next();
  }
}
