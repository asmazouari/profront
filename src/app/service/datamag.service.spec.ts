import { TestBed } from '@angular/core/testing';

import { DatamagService } from './datamag.service';

describe('DatamagService', () => {
  let service: DatamagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
