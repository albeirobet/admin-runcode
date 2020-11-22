import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentExtraReportComponent } from 'src/app/components/reports/view-reports/payment-extra-report/payment-extra-report.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentExtraReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentExtraReportRoutingModule { }
