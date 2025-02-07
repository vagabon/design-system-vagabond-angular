import { TestBed } from '@angular/core/testing';

import { NgDsvService } from './ng-dsv.service';

describe('NgDsvService', () => {
  let service: NgDsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgDsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
