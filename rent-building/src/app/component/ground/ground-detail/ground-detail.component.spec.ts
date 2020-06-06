import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundDetailComponent } from './ground-detail.component';

describe('GroundDetailComponent', () => {
  let component: GroundDetailComponent;
  let fixture: ComponentFixture<GroundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
