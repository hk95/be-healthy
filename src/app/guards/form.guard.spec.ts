import { TestBed } from '@angular/core/testing';

import { FormGuard } from './form.guard';

describe('FormGuard', () => {
  let guard: FormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    guard = TestBed.inject(FormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
