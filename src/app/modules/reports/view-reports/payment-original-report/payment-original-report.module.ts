import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PaymentOriginalReportRoutingModule } from './payment-original-report-routing.module';
import { PaymentOriginalReportComponent } from 'src/app/components/reports/view-reports/payment-original-report/payment-original-report.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [PaymentOriginalReportComponent],
  imports: [
    SharedModule,
    PaymentOriginalReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [PaymentOriginalReportComponent]
})
export class PaymentOriginalReportModule { }
