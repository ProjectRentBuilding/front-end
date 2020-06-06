import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundDeleteComponent } from './ground-delete.component';

describe('GroundDeleteComponent', () => {
  let component: GroundDeleteComponent;
  let fixture: ComponentFixture<GroundDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
