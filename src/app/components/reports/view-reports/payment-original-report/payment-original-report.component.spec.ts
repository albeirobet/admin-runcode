import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOriginalReportComponent } from './payment-original-report.component';

describe('PaymentOriginalReportComponent', () => {
  let component: PaymentOriginalReportComponent;
  let fixture: ComponentFixture<PaymentOriginalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOriginalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOriginalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
