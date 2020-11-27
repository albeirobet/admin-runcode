import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { HttpResponse } from '@angular/common/http';
import { IReportUploader } from 'src/app/model/reports/report-uploader';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css'],
  providers: [DialogService]
})
export class ViewReportsComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Visualización de Información';

  loading: boolean = true;

  report: IReportUploader = null;

  // --- Lista de tipos de reportes
  reportTypeList: IReportUploader[];

  REPORT_DATOS_DOCUMENTOS_FACTURAS = AppConstants.REPORT_DATOS_DOCUMENTOS_FACTURAS;
  REPORT_DATOS_CLIENTES = AppConstants.REPORT_DATOS_CLIENTES;
  REPORT_SEGUIMIENTO_ENTRADA_MERCANCIAS = AppConstants.REPORT_SEGUIMIENTO_ENTRADA_MERCANCIAS;
  REPORT_ENTRADA_MERCANCIAS = AppConstants.REPORT_ENTRADA_MERCANCIAS;
  REPORT_FACTURAS_VENTAS = AppConstants.REPORT_FACTURAS_VENTAS;
  REPORT_FACTURAS_PROVEEDORES = AppConstants.REPORT_FACTURAS_PROVEEDORES;
  REPORT_DOCUMENTOS_IVA = AppConstants.REPORT_DOCUMENTOS_IVA;
  REPORT_CUENTAS_CONTABLES_DOCUMENTOS = AppConstants.REPORT_CUENTAS_CONTABLES_DOCUMENTOS
  REPORT_MATERIALES = AppConstants.REPORT_MATERIALES;
  REPORT_EXTRA_PAGOS_DEPOSITOS = AppConstants.REPORT_EXTRA_PAGOS_DEPOSITOS;
  REPORT_PAGOS_DEPOSITOS = AppConstants.REPORT_PAGOS_DEPOSITOS;
  REPORT_PEDIDOS_COMPRA = AppConstants.REPORT_PEDIDOS_COMPRA;
  REPORT_SEGUIMIENTO_PEDIDOS_COMPRA = AppConstants.REPORT_SEGUIMIENTO_PEDIDOS_COMPRA;
  REPORT_RETENCIONES_PROVEEDORES = AppConstants.REPORT_RETENCIONES_PROVEEDORES;
  REPORT_SERVICIOS = AppConstants.REPORT_SERVICIOS;
  REPORT_PROVEEDORES = AppConstants.REPORT_PROVEEDORES;

  constructor(protected reportGeneratorService: ReportGeneratorService) {
  }

  ngOnInit(): void {
    this.getReportUploader();
  }

  /**
   * Obtiene la configuracion de reportes por empresa
   */
  getReportUploader() {
    this.loading = true;
    this.reportTypeList = [];
    this.reportGeneratorService.getReportUploader().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        console.log(res)
        this.loading = false;
        this.reportTypeList = res.body.data
      },
      error => {
        console.dir(error.error);
        this.loading = false;
      }
    );
  }

}
