import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  // --- Info a Actualizar
  info?: any;

  loading: boolean = false;

  // --- Deshabilita los botones del file upload
  enableUpload = true;

  uploadedFiles: any[] = [];

  constructor(protected reportGeneratorService: ReportGeneratorService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notificationService: NotificationService) {
    this.info = config.data;
    console.log(this.info)
  }

  ngOnInit(): void {
  }

  close(): void {
    this.ref.close(null);
  }

  progress() {
    this.loading = true;
  }

  onUpload(event) {
    console.log('OnUpload', event);
  }

  upload(event) {
    console.log('uploadFile', event);
    this.loading = true;
    console.log(event.files[0])
    switch (this.info.code) {
      case AppConstants.REPORT_DATOS_CLIENTES: {
        this.uploadCientesFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_PROVEEDORES: {
        this.uploadProveedorFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_SERVICIOS: {
        this.uploadServiciosFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_MATERIALES: {
        this.uploadMaterialesFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_PEDIDOS_COMPRA: {
        this.uploadPedidosCompraFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_ENTRADA_MERCANCIAS: {
        this.uploadEntradaMercanciasFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_SEGUIMIENTO_ENTRADA_MERCANCIAS: {
        this.uploadEntradaMercanciasExtraFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_FACTURAS_PROVEEDORES: {
        this.uploadFacturaProveedoresFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_RETENCIONES_PROVEEDORES: {
        this.uploadRetencionesProveedoresFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_FACTURAS_VENTAS: {
        this.uploadFacturasVentasFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_PAGOS_DEPOSITOS: {
        this.uploadPagosyDepositosFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_CUENTAS_CONTABLES_DOCUMENTOS: {
        this.uploadCuentasContablesFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_DATOS_DOCUMENTOS_FACTURAS: {
        this.uploadDocumentosFacturaFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_EXTRA_PAGOS_DEPOSITOS: {
        this.uploadPagosExtraFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_SEGUIMIENTO_PEDIDOS_COMPRA: {
        this.uploadPurchaseOrderTrackingFile(event.files[0]);
        break;
      }
      case AppConstants.REPORT_DOCUMENTOS_IVA: {
        this.uploadIvaFile(event.files[0]);
        break;
      }
      default: {
        break;
      }
    }
  }

  error(event: any) {
    this.loading = false;
    console.log('error', event);
    this.notificationService.error('Error al cargar el archivo.');
  }

  uploadCientesFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadClients(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadProveedorFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadSuppliers(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadServiciosFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadServices(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadMaterialesFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadMaterials(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadPedidosCompraFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadPurchaseOrders(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadEntradaMercanciasFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadEntryMerchandises(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadEntradaMercanciasExtraFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadEntryMerchandiseExtra(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadFacturaProveedoresFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadInvoiceSupplier(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadRetencionesProveedoresFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadRetentionSupplier(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadFacturasVentasFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadInvoiceClient(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadPagosyDepositosFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadPaymentOriginal(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadCuentasContablesFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadMasterReport(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadDocumentosFacturaFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadAssistantReport(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadPagosExtraFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadPaymentExtra(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadPurchaseOrderTrackingFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadPurchaseOrderTracking(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  uploadIvaFile(file) {
    this.loading = true;
    this.reportGeneratorService.uploadIva(file).subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.loading = false;
        this.ref.close(true);
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

}
