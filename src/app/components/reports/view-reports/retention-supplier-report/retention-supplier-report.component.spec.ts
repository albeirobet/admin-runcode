import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionSupplierReportComponent } from './retention-supplier-report.component';

describe('RetentionSupplierReportComponent', () => {
  let component: RetentionSupplierReportComponent;
  let fixture: ComponentFixture<RetentionSupplierReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetentionSupplierReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionSupplierReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
