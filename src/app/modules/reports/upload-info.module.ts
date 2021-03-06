import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { UploadInfoRoutingModule } from './upload-info-routing.module';
import { UploadInfoComponent } from 'src/app/components/reports/upload-info/upload-info.component';
import { FileUploadInfoModule } from './file-upload-info.module';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [UploadInfoComponent],
  imports: [
    SharedModule,
    UploadInfoRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    FileUploadInfoModule,
    ConfirmDialogModule,
    ProgressBarModule,
    DialogModule
  ],
  exports: [UploadInfoComponent]
})
export class UploadInfoModule { }
