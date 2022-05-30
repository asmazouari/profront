import { TestBed } from '@angular/core/testing';

import { DataproductService } from './dataproduct.service';

describe('DataproductService', () => {
  let service: DataproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
