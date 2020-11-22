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
import { PurchaseOrdersReportModule } from './purchase-orders-report/purchase-orders-report.module';
import { EntryMerchandisesReportModule } from './entry-merchandises-report/entry-merchandises-report.module';
import { InvoiceSupplierReportModule } from './invoice-supplier-report/invoice-supplier-report.module';
import { RetentionSupplierReportModule } from './retention-supplier-report/retention-supplier-report.module';
import { InvoiceClientReportModule } from './invoice-client-report/invoice-client-report.module';
import { MasterReportModule } from './master-report/master-report.module';
import { AssistantReportModule } from './assistant-report/assistant-report.module';
import { EntryMerchandisesExtraReportModule } from './entry-merchandises-extra-report/entry-merchandises-extra-report.module';
import { IvaReportModule } from './iva-report/iva-report.module';
import { PaymentExtraReportModule } from './payment-extra-report/payment-extra-report.module';
import { PaymentOriginalReportModule } from './payment-original-report/payment-original-report.module';

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
    MaterialsReportModule,
    PurchaseOrdersReportModule,
    EntryMerchandisesReportModule,
    InvoiceSupplierReportModule,
    RetentionSupplierReportModule,
    InvoiceClientReportModule,
    MasterReportModule,
    AssistantReportModule,
    EntryMerchandisesExtraReportModule,
    IvaReportModule,
    PaymentExtraReportModule,
    PaymentOriginalReportModule,
  ],
  exports: [ViewReportsComponent]
})
export class ViewReportsModule { }
