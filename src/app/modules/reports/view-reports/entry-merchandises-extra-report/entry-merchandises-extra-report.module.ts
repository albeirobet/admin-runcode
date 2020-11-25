import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EntryMerchandisesExtraReportComponent } from 'src/app/components/reports/view-reports/entry-merchandises-extra-report/entry-merchandises-extra-report.component';
import { EntryMerchandisesExtraReportRoutingModule } from './entry-merchandises-extra-report-routing.module';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [EntryMerchandisesExtraReportComponent],
  imports: [
    SharedModule,
    EntryMerchandisesExtraReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [EntryMerchandisesExtraReportComponent]
})
export class EntryMerchandisesExtraReportModule { }
