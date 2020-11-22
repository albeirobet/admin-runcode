import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MasterReportComponent } from 'src/app/components/reports/view-reports/master-report/master-report.component';
import { MasterReportRoutingModule } from './master-report-routing.module';

@NgModule({
  declarations: [MasterReportComponent],
  imports: [
    SharedModule,
    MasterReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  exports: [MasterReportComponent]
})
export class MasterReportModule { }
