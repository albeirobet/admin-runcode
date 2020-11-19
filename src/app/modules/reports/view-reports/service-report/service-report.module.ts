import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ServiceReportRoutingModule } from './service-report-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ServiceReportComponent } from 'src/app/components/reports/view-reports/service-report/service-report.component';

@NgModule({
  declarations: [ServiceReportComponent],
  imports: [
    SharedModule,
    ServiceReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  exports: [ServiceReportComponent]
})
export class ServiceReportModule { }
