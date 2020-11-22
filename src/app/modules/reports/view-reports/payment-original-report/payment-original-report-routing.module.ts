import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentOriginalReportComponent } from 'src/app/components/reports/view-reports/payment-original-report/payment-original-report.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentOriginalReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentOriginalReportRoutingModule { }
