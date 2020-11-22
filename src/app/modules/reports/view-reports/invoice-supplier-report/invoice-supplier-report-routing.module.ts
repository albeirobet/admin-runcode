import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceSupplierReportComponent } from 'src/app/components/reports/view-reports/invoice-supplier-report/invoice-supplier-report.component';

const routes: Routes = [
    {
        path: '',
        component: InvoiceSupplierReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceSupplierReportRoutingModule { }
