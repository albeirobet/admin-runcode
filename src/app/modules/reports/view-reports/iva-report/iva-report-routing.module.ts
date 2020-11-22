import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IvaReportComponent } from 'src/app/components/reports/view-reports/iva-report/iva-report.component';

const routes: Routes = [
    {
        path: '',
        component: IvaReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IvaReportRoutingModule { }
