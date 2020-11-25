import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { InvoiceClientReportRoutingModule } from './invoice-client-report-routing.module';
import { InvoiceClientReportComponent } from 'src/app/components/reports/view-reports/invoice-client-report/invoice-client-report.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [InvoiceClientReportComponent],
  imports: [
    SharedModule,
    InvoiceClientReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [InvoiceClientReportComponent]
})
export class InvoiceClientReportModule { }
