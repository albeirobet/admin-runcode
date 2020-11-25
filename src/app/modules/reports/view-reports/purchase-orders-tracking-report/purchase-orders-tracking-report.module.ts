import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PurchaseOrdersReportComponent } from 'src/app/components/reports/view-reports/purchase-orders-report/purchase-orders-report.component';
import { AccordionModule } from 'primeng/accordion';
import { PurchaseOrdersTrackingReportRoutingModule } from './purchase-orders-tracking-report-routing.module';
import { PurchaseOrdersTrackingReportComponent } from 'src/app/components/reports/view-reports/purchase-orders-tracking-report/purchase-orders-tracking-report.component';

@NgModule({
  declarations: [PurchaseOrdersTrackingReportComponent],
  imports: [
    SharedModule,
    PurchaseOrdersTrackingReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [PurchaseOrdersTrackingReportComponent]
})
export class PurchaseOrdersTrackingReportModule { }
