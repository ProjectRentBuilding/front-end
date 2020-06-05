import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorAddComponent } from './floor-add.component';

describe('FloorAddComponent', () => {
  let component: FloorAddComponent;
  let fixture: ComponentFixture<FloorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
