import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DailyMeal } from 'src/app/interfaces/daily-info';

export type MealType = 'breakfast' | 'lunch' | 'dinner';

@Component({
  selector: 'app-meal-result-list',
  templateUrl: './meal-result-list.component.html',
  styleUrls: ['./meal-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MealResultListComponent implements OnChanges {
  @Input()
  mealType: MealType;

  @Input()
  meals: DailyMeal[];

  @Input()
  date: string;

  isOpen = false;

  readonly meals$ = new BehaviorSubject<DailyMeal[]>(undefined);

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.meals) {
      this.meals$.next(this.meals);
    }
  }
}
