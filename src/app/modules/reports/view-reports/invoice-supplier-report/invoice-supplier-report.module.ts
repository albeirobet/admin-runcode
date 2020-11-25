import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { InvoiceSupplierReportRoutingModule } from './invoice-supplier-report-routing.module';
import { InvoiceSupplierReportComponent } from 'src/app/components/reports/view-reports/invoice-supplier-report/invoice-supplier-report.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [InvoiceSupplierReportComponent],
  imports: [
    SharedModule,
    InvoiceSupplierReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [InvoiceSupplierReportComponent]
})
export class InvoiceSupplierReportModule { }
