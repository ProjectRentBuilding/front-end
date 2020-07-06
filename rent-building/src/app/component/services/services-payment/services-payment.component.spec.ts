import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPaymentComponent } from './services-payment.component';

describe('ServicesPaymentComponent', () => {
  let component: ServicesPaymentComponent;
  let fixture: ComponentFixture<ServicesPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
