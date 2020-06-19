import { TestBed } from '@angular/core/testing';

import { ImgurApiService } from './imgur-api.service';

describe('ImgurApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgurApiService = TestBed.get(ImgurApiService);
    expect(service).toBeTruthy();
  });
});
