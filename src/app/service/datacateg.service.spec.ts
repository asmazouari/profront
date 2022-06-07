import { TestBed } from '@angular/core/testing';

import { DatacategService } from './datacateg.service';

describe('DatacategService', () => {
  let service: DatacategService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatacategService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
