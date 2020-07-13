import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstructorAdminComponent } from './list-instructor-admin.component';

describe('ListInstructorAdminComponent', () => {
  let component: ListInstructorAdminComponent;
  let fixture: ComponentFixture<ListInstructorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInstructorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstructorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
