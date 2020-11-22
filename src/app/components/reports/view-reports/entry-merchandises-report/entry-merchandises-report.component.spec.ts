import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryMerchandisesReportComponent } from './entry-merchandises-report.component';

describe('EntryMerchandisesReportComponent', () => {
  let component: EntryMerchandisesReportComponent;
  let fixture: ComponentFixture<EntryMerchandisesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryMerchandisesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryMerchandisesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
