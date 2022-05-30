import { TestBed } from '@angular/core/testing';

import { DatarayonService } from './datarayon.service';

describe('DatarayonService', () => {
  let service: DatarayonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatarayonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
