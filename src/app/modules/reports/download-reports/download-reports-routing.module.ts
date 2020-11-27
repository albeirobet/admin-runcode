import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadReportsComponent } from 'src/app/components/reports/download-reports/download-reports.component';

const routes: Routes = [
    {
        path: '',
        component: DownloadReportsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DownloadReportsRoutingModule { }
