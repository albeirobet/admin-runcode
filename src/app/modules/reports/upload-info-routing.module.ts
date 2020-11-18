import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadInfoComponent } from 'src/app/components/reports/upload-info/upload-info.component';

const routes: Routes = [
    {
        path: '',
        component: UploadInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UploadInfoRoutingModule { }
