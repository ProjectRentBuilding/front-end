import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesInvoiceComponent } from './services-invoice.component';

describe('ServicesInvoiceComponent', () => {
  let component: ServicesInvoiceComponent;
  let fixture: ComponentFixture<ServicesInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
