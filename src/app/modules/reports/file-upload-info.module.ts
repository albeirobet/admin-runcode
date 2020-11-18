import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FileUploadRoutingModule } from './file-upload-info-routing.module';
import { ButtonModule } from 'primeng/button';
import { FileUploadComponent } from 'src/app/components/reports/upload-info/file-upload/file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    SharedModule,
    FileUploadRoutingModule,
    ButtonModule,
    FileUploadModule
  ],
  exports: [FileUploadComponent]
})
export class FileUploadInfoModule { }
