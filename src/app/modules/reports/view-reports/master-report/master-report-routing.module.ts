import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterReportComponent } from 'src/app/components/reports/view-reports/master-report/master-report.component';

const routes: Routes = [
    {
        path: '',
        component: MasterReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterReportRoutingModule { }
