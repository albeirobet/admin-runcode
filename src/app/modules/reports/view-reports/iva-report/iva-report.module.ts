import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { IvaReportRoutingModule } from './iva-report-routing.module';
import { IvaReportComponent } from 'src/app/components/reports/view-reports/iva-report/iva-report.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [IvaReportComponent],
  imports: [
    SharedModule,
    IvaReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [IvaReportComponent]
})
export class IvaReportModule { }
