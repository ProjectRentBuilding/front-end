import { TestBed } from '@angular/core/testing';

import { TypeEquipmentService } from './type-equipment.service';

describe('TypeEquipmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeEquipmentService = TestBed.get(TypeEquipmentService);
    expect(service).toBeTruthy();
  });
});
