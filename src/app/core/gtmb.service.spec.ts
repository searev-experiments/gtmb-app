import { TestBed, inject } from '@angular/core/testing';

import { GtmbService } from './gtmb.service';

describe('GtmbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GtmbService]
    });
  });

  it('should be created', inject([GtmbService], (service: GtmbService) => {
    expect(service).toBeTruthy();
  }));
});
