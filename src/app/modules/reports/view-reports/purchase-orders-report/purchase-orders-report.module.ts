import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PurchaseOrdersReportRoutingModule } from './purchase-orders-report-routing.module';
import { PurchaseOrdersReportComponent } from 'src/app/components/reports/view-reports/purchase-orders-report/purchase-orders-report.component';

@NgModule({
  declarations: [PurchaseOrdersReportComponent],
  imports: [
    SharedModule,
    PurchaseOrdersReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  exports: [PurchaseOrdersReportComponent]
})
export class PurchaseOrdersReportModule { }
