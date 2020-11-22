import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentExtraReportComponent } from './payment-extra-report.component';

describe('PaymentExtraReportComponent', () => {
  let component: PaymentExtraReportComponent;
  let fixture: ComponentFixture<PaymentExtraReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentExtraReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentExtraReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
