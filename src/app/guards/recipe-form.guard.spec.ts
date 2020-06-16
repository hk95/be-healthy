import { TestBed } from '@angular/core/testing';

import { RecipeFormGuard } from './recipe-form.guard';

describe('RecipeFormGuard', () => {
  let guard: RecipeFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipeFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
