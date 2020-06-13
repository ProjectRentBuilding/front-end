import { TestBed } from '@angular/core/testing';

import { TypeGroundService } from './type-ground.service';

describe('TypeGroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeGroundService = TestBed.get(TypeGroundService);
    expect(service).toBeTruthy();
  });
});
