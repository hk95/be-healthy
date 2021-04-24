import { TestBed } from '@angular/core/testing';

import { DailyInfoService } from './daily-info.service';

describe('DailyInfoService', () => {
  let service: DailyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
