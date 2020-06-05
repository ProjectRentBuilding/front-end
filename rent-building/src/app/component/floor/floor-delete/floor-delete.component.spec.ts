import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorDeleteComponent } from './floor-delete.component';

describe('FloorDeleteComponent', () => {
  let component: FloorDeleteComponent;
  let fixture: ComponentFixture<FloorDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
