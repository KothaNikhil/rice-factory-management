import { TestBed } from '@angular/core/testing';

import { FirmAuthService } from './firm-auth.service';

describe('FirmAuthService', () => {
  let service: FirmAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
