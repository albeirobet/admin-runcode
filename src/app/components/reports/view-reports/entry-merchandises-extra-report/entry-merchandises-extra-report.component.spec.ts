import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryMerchandisesExtraReportComponent } from './entry-merchandises-extra-report.component';

describe('EntryMerchandisesExtraReportComponent', () => {
  let component: EntryMerchandisesExtraReportComponent;
  let fixture: ComponentFixture<EntryMerchandisesExtraReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryMerchandisesExtraReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryMerchandisesExtraReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
