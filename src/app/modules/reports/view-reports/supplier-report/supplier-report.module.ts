import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SupplierReportRoutingModule } from './supplier-report-routing.module';
import { SupplierReportComponent } from 'src/app/components/reports/view-reports/supplier-report/supplier-report.component';

@NgModule({
  declarations: [SupplierReportComponent],
  imports: [
    SharedModule,
    SupplierReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  exports: [SupplierReportComponent]
})
export class SupplierReportModule { }
