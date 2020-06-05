import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDeleteComponent } from './equipment-delete.component';

describe('EquipmentDeleteComponent', () => {
  let component: EquipmentDeleteComponent;
  let fixture: ComponentFixture<EquipmentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
