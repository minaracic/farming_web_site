import { TestBed } from '@angular/core/testing';

import { ArticlService } from './articl.service';

describe('ArticlService', () => {
  let service: ArticlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
