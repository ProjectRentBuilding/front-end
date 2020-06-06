import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundEditComponent } from './ground-edit.component';

describe('GroundEditComponent', () => {
  let component: GroundEditComponent;
  let fixture: ComponentFixture<GroundEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
