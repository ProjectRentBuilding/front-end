import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCustomerComponent } from './services-customer.component';

describe('ServicesCustomerComponent', () => {
  let component: ServicesCustomerComponent;
  let fixture: ComponentFixture<ServicesCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
