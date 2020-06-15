import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentBuildingComponent } from './equipment-building.component';

describe('EquipmentBuildingComponent', () => {
  let component: EquipmentBuildingComponent;
  let fixture: ComponentFixture<EquipmentBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
