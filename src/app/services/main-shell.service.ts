import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DailyMeal } from '../interfaces/daily-info';

@Injectable({
  providedIn: 'root',
})
export class MainShellService {
  private readonly selectedMealsSource = new ReplaySubject<DailyMeal[]>();
  private readonly paymentCompletedSource = new ReplaySubject<void>();

  readonly PAGE_TITLES = {
    top: 'TOP',
    graph: 'グラフ',
    menu: 'マイメニュー',
    more: 'その他',
    donation: '開発者を支援',
  };
  readonly MEAL_TITLES = {
    breakfast: 'breakfast',
    lunch: 'lunch',
    dinner: 'dinner',
  };

  title: string;
  titleMeal: string;
  selectedMeals = this.selectedMealsSource.asObservable();
  paymentCompleted$ = this.paymentCompletedSource.asObservable();

  constructor() {}

  setSelectedMeals(selectedMeals: DailyMeal[]) {
    this.selectedMealsSource.next(selectedMeals);
  }

  paymentCompleted() {
    this.paymentCompletedSource.next();
  }
}
