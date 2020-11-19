import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientReportComponent } from 'src/app/components/reports/view-reports/client-report/client-report.component';

const routes: Routes = [
    {
        path: '',
        component: ClientReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientReportRoutingModule { }
