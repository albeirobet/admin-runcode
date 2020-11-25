import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MaterialsReportRoutingModule } from './materials-report-routing.module';
import { MaterialsReportComponent } from 'src/app/components/reports/view-reports/materials-report/materials-report.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [MaterialsReportComponent],
  imports: [
    SharedModule,
    MaterialsReportRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AccordionModule
  ],
  exports: [MaterialsReportComponent]
})
export class MaterialsReportModule { }
