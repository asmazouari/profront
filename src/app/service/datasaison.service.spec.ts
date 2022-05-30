import { TestBed } from '@angular/core/testing';

import { DatasaisonService } from './datasaison.service';

describe('DatasaisonService', () => {
  let service: DatasaisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasaisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
