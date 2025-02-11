import { TestBed } from '@angular/core/testing';

import { BasicInfoService } from './basic-info.service';

describe('BasicInfoService', () => {
  let service: BasicInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(BasicInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
