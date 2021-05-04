import { TestBed } from '@angular/core/testing';

import { CalculateCNitionService } from './calculate-nutrition.service';

describe('CreateSetFormService', () => {
  let service: CalculateCNitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateCNitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
