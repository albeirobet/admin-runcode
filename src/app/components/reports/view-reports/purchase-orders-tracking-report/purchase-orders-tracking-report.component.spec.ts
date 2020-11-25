import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersTrackingReportComponent } from './purchase-orders-tracking-report.component';

describe('PurchaseOrdersTrackingReportComponent', () => {
  let component: PurchaseOrdersTrackingReportComponent;
  let fixture: ComponentFixture<PurchaseOrdersTrackingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersTrackingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersTrackingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
