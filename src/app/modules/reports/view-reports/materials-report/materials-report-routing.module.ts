import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsReportComponent } from 'src/app/components/reports/view-reports/materials-report/materials-report.component';

const routes: Routes = [
    {
        path: '',
        component: MaterialsReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialsReportRoutingModule { }
