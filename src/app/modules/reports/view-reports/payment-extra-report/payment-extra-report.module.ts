import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PaymentExtraReportComponent } from 'src/app/components/reports/view-reports/payment-extra-report/payment-extra-report.component';
import { PaymentExtraReportRoutingModule } from './payment-extra-report-routing.module';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [PaymentExtraReportComponent],
  imports: [
    SharedModule,
    PaymentExtraReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [PaymentExtraReportComponent]
})
export class PaymentExtraReportModule { }
