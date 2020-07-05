import { TestBed } from '@angular/core/testing';

import { StorageArticlsService } from './storage-articls.service';

describe('StorageArticlsService', () => {
  let service: StorageArticlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageArticlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
