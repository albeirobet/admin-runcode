import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetentionSupplierReportComponent } from 'src/app/components/reports/view-reports/retention-supplier-report/retention-supplier-report.component';

const routes: Routes = [
    {
        path: '',
        component: RetentionSupplierReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RetentionSupplierReportRoutingModule { }
