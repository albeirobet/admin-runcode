import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantReportComponent } from './assistant-report.component';

describe('AssistantReportComponent', () => {
  let component: AssistantReportComponent;
  let fixture: ComponentFixture<AssistantReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
