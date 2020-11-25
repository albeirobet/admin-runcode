import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { AssistantReportRoutingModule } from './assistant-report-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AssistantReportComponent } from 'src/app/components/reports/view-reports/assistant-report/assistant-report.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [AssistantReportComponent],
  imports: [
    SharedModule,
    AssistantReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [AssistantReportComponent]
})
export class AssistantReportModule { }
