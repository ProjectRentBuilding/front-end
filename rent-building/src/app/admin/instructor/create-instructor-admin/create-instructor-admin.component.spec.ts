import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructorAdminComponent } from './create-instructor-admin.component';

describe('CreateInstructorAdminComponent', () => {
  let component: CreateInstructorAdminComponent;
  let fixture: ComponentFixture<CreateInstructorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstructorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstructorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
