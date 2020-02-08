import { TestBed } from '@angular/core/testing';

import { PurchaseHistoryService } from './purchase-history.service';

describe('PurchaseHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseHistoryService = TestBed.get(PurchaseHistoryService);
    expect(service).toBeTruthy();
  });
});
