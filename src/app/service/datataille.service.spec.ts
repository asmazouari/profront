import { TestBed } from '@angular/core/testing';

import { DatatailleService } from './datataille.service';

describe('DatatailleService', () => {
  let service: DatatailleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatatailleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
