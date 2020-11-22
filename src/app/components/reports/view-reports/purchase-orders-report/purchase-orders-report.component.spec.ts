import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersReportComponent } from './purchase-orders-report.component';

describe('PurchaseOrdersReportComponent', () => {
  let component: PurchaseOrdersReportComponent;
  let fixture: ComponentFixture<PurchaseOrdersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
