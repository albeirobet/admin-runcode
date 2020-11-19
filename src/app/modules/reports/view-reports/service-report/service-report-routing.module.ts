import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceReportComponent } from 'src/app/components/reports/view-reports/service-report/service-report.component';

const routes: Routes = [
    {
        path: '',
        component: ServiceReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceReportRoutingModule { }
