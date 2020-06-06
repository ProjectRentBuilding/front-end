import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundAddComponent } from './ground-add.component';

describe('GroundAddComponent', () => {
  let component: GroundAddComponent;
  let fixture: ComponentFixture<GroundAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
