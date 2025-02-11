import { TestBed } from '@angular/core/testing';

import { OthreShellService } from './othre-shell.service';

describe('OthreShellService', () => {
  let service: OthreShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(OthreShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
