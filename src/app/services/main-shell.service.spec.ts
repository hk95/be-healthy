import { TestBed } from '@angular/core/testing';

import { MainShellService } from './main-shell.service';

describe('MainShellService', () => {
  let service: MainShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
