import { TestBed } from '@angular/core/testing';

import { AverageService } from './average.service';

describe('AverageService', () => {
  let service: AverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
