import { TestBed } from '@angular/core/testing';

import { UserBuildingService } from './user-building.service';

describe('UserBuildingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBuildingService = TestBed.get(UserBuildingService);
    expect(service).toBeTruthy();
  });
});
