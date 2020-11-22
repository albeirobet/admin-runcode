import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EntryMerchandisesReportComponent } from 'src/app/components/reports/view-reports/entry-merchandises-report/entry-merchandises-report.component';
import { RetentionSupplierReportRoutingModule } from './retention-supplier-report-routing.module';
import { RetentionSupplierReportComponent } from 'src/app/components/reports/view-reports/retention-supplier-report/retention-supplier-report.component';

@NgModule({
  declarations: [RetentionSupplierReportComponent],
  imports: [
    SharedModule,
    RetentionSupplierReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  exports: [RetentionSupplierReportComponent]
})
export class RetentionSupplierReportModule { }
