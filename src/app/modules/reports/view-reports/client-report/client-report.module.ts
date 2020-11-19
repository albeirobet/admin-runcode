import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ClientReportComponent } from 'src/app/components/reports/view-reports/client-report/client-report.component';
import { ClientReportRoutingModule } from './client-report-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [ClientReportComponent],
  imports: [
    SharedModule,
    ClientReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  exports: [ClientReportComponent]
})
export class ClientReportModule { }
