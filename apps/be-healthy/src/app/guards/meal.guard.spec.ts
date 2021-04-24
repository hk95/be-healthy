import { TestBed } from '@angular/core/testing';

import { MealGuard } from './meal.guard';

describe('MealGuard', () => {
  let guard: MealGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MealGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
