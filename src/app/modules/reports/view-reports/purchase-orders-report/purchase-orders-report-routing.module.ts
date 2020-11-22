import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrdersReportComponent } from 'src/app/components/reports/view-reports/purchase-orders-report/purchase-orders-report.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseOrdersReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseOrdersReportRoutingModule { }
