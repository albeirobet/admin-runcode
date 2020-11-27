import { NgModule } from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DownloadReportsRoutingModule } from './download-reports-routing.module';
import {ProgressBarModule} from 'primeng/progressbar';
import { SharedModule } from '../../shared/shared.module';
import { DownloadReportsComponent } from 'src/app/components/reports/download-reports/download-reports.component';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [DownloadReportsComponent],
  imports: [
    SharedModule,
    DownloadReportsRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ProgressBarModule,
    TooltipModule,
    DialogModule
  ],
  exports: [DownloadReportsComponent]
})
export class DownloadReportsModule { }
