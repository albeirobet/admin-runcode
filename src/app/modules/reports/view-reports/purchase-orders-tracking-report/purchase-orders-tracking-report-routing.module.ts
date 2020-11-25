import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrdersTrackingReportComponent } from 'src/app/components/reports/view-reports/purchase-orders-tracking-report/purchase-orders-tracking-report.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseOrdersTrackingReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseOrdersTrackingReportRoutingModule { }
