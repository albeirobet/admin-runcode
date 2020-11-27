import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ConfirmationService } from 'primeng/api';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { HttpResponse } from '@angular/common/http';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { IReportUploader } from 'src/app/model/reports/report-uploader';
import { AppConstants } from 'src/app/utils/constants/app-constants';

type EntityResponseType = HttpResponse<GeneralResponse>;

@Component({
  selector: 'app-upload-info',
  templateUrl: './upload-info.component.html',
  styleUrls: ['./upload-info.component.css'],
  providers: [DialogService]
})
export class UploadInfoComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Cargar Información';

  loading: boolean = true;

  // --- Lista de tipos de informacion
  infoList?: IReportUploader[];

  reportInfo: any = null;
  displayReportInfo: boolean = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    protected reportGeneratorService: ReportGeneratorService
  ) {
  }
  
  ngOnInit(): void {
    this.getReportUploader(false);
  }

  ngOnDestroy(): void {
    if(this.interval) {
      this.stopTimer();
    }
  }

  interval = null;
  startTimer() {
    this.interval = setInterval(() => {
      this.getReportUploader(true);
    },5000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  getReportInfo(info) {
    this.loading = true;
    this.reportGeneratorService.getReportInfo(info.code).subscribe(
      data => {
        console.log(data.body.data)
        this.reportInfo = data.body.data;
        this.displayReportInfo = true;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  /**
   * Obtiene la configuracion de reportes por empresa
   */
  getReportUploader(validate) {
    this.loading = true;
    this.infoList = [];
    this.reportGeneratorService.getReportUploader().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        console.log(res)
        this.infoList = res.body.data;
        let inprocess = false;
        this.loading = false;
        if(validate) {
          this.infoList.forEach(element => {
            if(element.percentageCompletition &&
                parseInt(element.percentageCompletition) > 0 &&
                parseInt(element.percentageCompletition) < 100) {
                  inprocess = true;
                }
          });
          if(inprocess && !this.interval) {
            setTimeout(() => {
              this.startTimer();
            },5000);
          } else {
            if(!inprocess && this.interval) {
              this.stopTimer();
            }
          }
        }
      },
      error => {
        console.dir(error.error);
        this.loading = false;
      }
    );
  }

  uploadFile(info: any): void {
    const ref = this.dialogService.open(FileUploadComponent, {
      data: info,
      header: 'Cargar Información [' + info.name + ']',
      width: '50%'
    });
    ref.onClose.subscribe((response: Boolean) => {
      if (response) {
        this.notificationService.success('Se ha iniciado la carga de información, por favor valide en un momento su información');
        this.getReportUploader(true);
      }
    });
  }

  confirmDeleteData(info) {
    console.log(info)
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar la información de [' + info.name + '] ?',
      accept: () => {
        this.deleteData(info);
      }
    });
  }

  /**
   * Eliminar datos
   */
  deleteData(info) {
    this.loading = true;
    switch (info.code) {
      case AppConstants.REPORT_DATOS_CLIENTES: {
        this.deleteClients();
        break;
      }
      case AppConstants.REPORT_PROVEEDORES: {
        this.deleteSuppliers();
        break;
      }
      case AppConstants.REPORT_SERVICIOS: {
        this.deleteServices();
        break;
      }
      case AppConstants.REPORT_MATERIALES: {
        this.deleteMaterials();
        break;
      }
      case AppConstants.REPORT_PEDIDOS_COMPRA: {
        this.deletePurchaseOrders();
        break;
      }
      case AppConstants.REPORT_ENTRADA_MERCANCIAS: {
        this.deleteEntryMerchandises();
        break;
      }
      case AppConstants.REPORT_SEGUIMIENTO_ENTRADA_MERCANCIAS: {
        this.deleteEntryMerchandisesExtra();
        break;
      }
      case AppConstants.REPORT_FACTURAS_PROVEEDORES: {
        this.deleteInvoiceSupplier();
        break;
      }
      case AppConstants.REPORT_RETENCIONES_PROVEEDORES: {
        this.deleteRetentionSupplier();
        break;
      }
      case AppConstants.REPORT_FACTURAS_VENTAS: {
        this.deleteInvoiceClient();
        break;
      }
      case AppConstants.REPORT_PAGOS_DEPOSITOS: {
        this.deletePaymentOriginal();
        break;
      }
      case AppConstants.REPORT_CUENTAS_CONTABLES_DOCUMENTOS: {
        this.deleteMasterReport();
        break;
      }
      case AppConstants.REPORT_DATOS_DOCUMENTOS_FACTURAS: {
        this.deleteAssistantReport();
        break;
      }
      case AppConstants.REPORT_EXTRA_PAGOS_DEPOSITOS: {
        this.deletePaymentExtra();
        break;
      }
      case AppConstants.REPORT_SEGUIMIENTO_PEDIDOS_COMPRA: {
        this.deletePurchaseOrderTracking();
        break;
      }
      case AppConstants.REPORT_DOCUMENTOS_IVA: {
        this.deleteIvaData();
        break;
      }
      default: {
        break;
      }
    }
  }

  deleteClients() {
    this.reportGeneratorService.deleteClients().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteSuppliers() {
    this.reportGeneratorService.deleteSuppliers().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteServices() {
    this.reportGeneratorService.deleteServices().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteMaterials() {
    this.reportGeneratorService.deleteMaterials().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deletePurchaseOrders() {
    this.reportGeneratorService.deletePurchaseOrders().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteEntryMerchandises() {
    this.reportGeneratorService.deleteEntryMerchandises().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteEntryMerchandisesExtra() {
    this.reportGeneratorService.deleteEntryMerchandiseExtra().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteInvoiceSupplier() {
    this.reportGeneratorService.deleteInvoiceSupplier().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteRetentionSupplier() {
    this.reportGeneratorService.deleteRetentionSupplier().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteInvoiceClient() {
    this.reportGeneratorService.deleteInvoiceClient().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteMasterReport() {
    this.reportGeneratorService.deleteMasterReport().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteAssistantReport() {
    this.reportGeneratorService.deleteAssistantReport().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deletePaymentOriginal() {
    this.reportGeneratorService.deletePaymentOriginal().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deletePaymentExtra() {
    this.reportGeneratorService.deletePaymentExtra().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deleteIvaData() {
    this.reportGeneratorService.deleteIva().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  deletePurchaseOrderTracking() {
    this.reportGeneratorService.deletePurchaseOrderTracking().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.getReportUploader(true);
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
}
