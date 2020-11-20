import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ViewReportsRoutingModule } from './view-reports-routing.module';
import { ViewReportsComponent } from 'src/app/components/reports/view-reports/view-reports.component';
import { SharedModule } from '../../shared/shared.module';
import { ClientReportModule } from './client-report/client-report.module';
import { SupplierReportModule } from './supplier-report/supplier-report.module';
import { ServiceReportModule } from './service-report/service-report.module';
import { MaterialsReportModule } from './materials-report/materials-report.module';

@NgModule({
  declarations: [ViewReportsComponent],
  imports: [
    SharedModule,
    ViewReportsRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ClientReportModule,
    SupplierReportModule,
    ServiceReportModule,
    MaterialsReportModule
  ],
  exports: [ViewReportsComponent]
})
export class ViewReportsModule { }
