import { TestBed } from '@angular/core/testing';

import { FoodService } from './food.service';

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('test ', () => {
    const aaa = 2;
    expect(aaa).toBe(2);
  });
});
