import { TestBed } from '@angular/core/testing';

import { TypeFloorService } from './type-floor.service';

describe('TypeFloorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeFloorService = TestBed.get(TypeFloorService);
    expect(service).toBeTruthy();
  });
});
