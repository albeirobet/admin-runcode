import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSupplierReportComponent } from './invoice-supplier-report.component';

describe('InvoiceSupplierReportComponent', () => {
  let component: InvoiceSupplierReportComponent;
  let fixture: ComponentFixture<InvoiceSupplierReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSupplierReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSupplierReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
