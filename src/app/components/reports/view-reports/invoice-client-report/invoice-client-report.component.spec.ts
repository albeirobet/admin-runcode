import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceClientReportComponent } from './invoice-client-report.component';

describe('InvoiceClientReportComponent', () => {
  let component: InvoiceClientReportComponent;
  let fixture: ComponentFixture<InvoiceClientReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceClientReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceClientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
