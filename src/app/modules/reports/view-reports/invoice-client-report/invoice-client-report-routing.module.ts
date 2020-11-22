import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceClientReportComponent } from 'src/app/components/reports/view-reports/invoice-client-report/invoice-client-report.component';

const routes: Routes = [
    {
        path: '',
        component: InvoiceClientReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceClientReportRoutingModule { }
