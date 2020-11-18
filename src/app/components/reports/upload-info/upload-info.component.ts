import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ConfirmationService } from 'primeng/api';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { HttpResponse } from '@angular/common/http';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';

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
  infoList?: any[];

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
    this.loadInfo();
  }

  async loadInfo() {
    this.loading = true;
    this.infoList = [];

    const responses = await Promise.all([
      this.countClients(),
      this.countSuppliers(),
      this.countServices(),
      this.countMaterials(),
      this.countPurchaseOrders(),
      this.countEntryMerchandises(),
      this.countInvoiceSupplier(),
      this.countRetentionSupplier(),
      this.countInvoiceClient(),
      this.countMasterReport(),
      this.countAssistantReport(),
      this.countPaymentOriginal(),
      this.countPaymentExtra()

    ]);

    this.infoList.push({ type: 'Clientes', code: 'CLI', numReg: responses[0], id: 1 });
    this.infoList.push({ type: 'Proveedores', code: 'PRO', numReg: responses[1], id: 2 });
    this.infoList.push({ type: 'Servicios', code: 'SER', numReg: responses[2], id: 3 });
    this.infoList.push({ type: 'Materiales', code: 'MAT', numReg: responses[3], id: 4 });
    this.infoList.push({ type: 'Pedidos de Compra', code: 'PDC', numReg: responses[4], id: 5 });
    this.infoList.push({ type: 'Entrada de Mercancias', code: 'EDM', numReg: responses[5], id: 6 });
    this.infoList.push({ type: 'Factura Proveedores', code: 'FPR', numReg: responses[6], id: 7 });
    this.infoList.push({ type: 'Retenciones Proveedores', code: 'RPR', numReg: responses[7], id: 8 });
    this.infoList.push({ type: 'Facturas de Ventas', code: 'FDV', numReg: responses[8], id: 9 });
    this.infoList.push({ type: 'Pagos y Depositos', code: 'PYD', numReg: responses[9], id: 10 });
    this.infoList.push({ type: 'Cuentas Contables', code: 'CCO', numReg: responses[10], id: 11 });
    this.infoList.push({ type: 'Documentos Facturas', code: 'DOF', numReg: responses[11], id: 12 });
    this.infoList.push({ type: 'Pagos Extra', code: 'PEX', numReg: responses[12], id: 13 });
    this.loading = false;
  }

  uploadFile(info: any): void {
    const ref = this.dialogService.open(FileUploadComponent, {
      data: info,
      header: 'Cargar Información [' + info.type + ']',
      width: '50%'
    });
    ref.onClose.subscribe((response: Boolean) => {
      if (response) {
        this.notificationService.success('Información cargada correctamente.');
        this.loadInfo();
      }
    });
  }

  confirmDeleteData(info) {
    console.log(info)
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar la información de [' + info.type + '] ?',
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
      case 'CLI': {
        this.deleteClients();
        break;
      }
      case 'PRO': {
        this.deleteSuppliers();
        break;
      }
      case 'SER': {
        this.deleteServices();
        break;
      }
      case 'MAT': {
        this.deleteMaterials();
        break;
      }
      case 'PDC': {
        this.deletePurchaseOrders();
        break;
      }
      case 'EDM': {
        this.deleteEntryMerchandises();
        break;
      }
      case 'FPR': {
        this.deleteInvoiceSupplier();
        break;
      }
      case 'RPR': {
        this.deleteRetentionSupplier();
        break;
      }
      case 'FDV': {
        this.deleteInvoiceClient();
        break;
      }
      case 'PYD': {
        this.deletePaymentOriginal();
        break;
      }
      case 'CCO': {
        this.deleteMasterReport();
        break;
      }
      case 'DOF': {
        this.deleteAssistantReport();
        break;
      }
      case 'PEX': {
        this.deletePaymentExtra();
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
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  async countClients() {
    const value = <GeneralResponse>await this.reportGeneratorService.countClients().toPromise();
    console.log(value)
    return value.data;
  }

  deleteSuppliers() {
    this.reportGeneratorService.deleteSuppliers().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  async countSuppliers() {
    const value = <GeneralResponse>await this.reportGeneratorService.countSuppliers().toPromise();
    return value.data;
  }

  deleteServices() {
    this.reportGeneratorService.deleteServices().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  async countServices() {
    const value = <GeneralResponse>await this.reportGeneratorService.countServices().toPromise();
    return value.data;
  }

  deleteMaterials() {
    this.reportGeneratorService.deleteMaterials().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countMaterials() {
    const value = <GeneralResponse>await this.reportGeneratorService.countMaterials().toPromise();
    return value.data;
  }

  deletePurchaseOrders() {
    this.reportGeneratorService.deletePurchaseOrders().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countPurchaseOrders() {
    const value = <GeneralResponse>await this.reportGeneratorService.countPurchaseOrders().toPromise();
    return value.data;
  }

  deleteEntryMerchandises() {
    this.reportGeneratorService.deleteEntryMerchandises().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countEntryMerchandises() {
    const value = <GeneralResponse>await this.reportGeneratorService.countEntryMerchandises().toPromise();
    return value.data;
  }

  deleteInvoiceSupplier() {
    this.reportGeneratorService.deleteInvoiceSupplier().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countInvoiceSupplier() {
    const value = <GeneralResponse>await this.reportGeneratorService.countInvoiceSupplier().toPromise();
    return value.data;
  }

  deleteRetentionSupplier() {
    this.reportGeneratorService.deleteRetentionSupplier().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countRetentionSupplier() {
    const value = <GeneralResponse>await this.reportGeneratorService.countRetentionSupplier().toPromise();
    return value.data;
  }

  deleteInvoiceClient() {
    this.reportGeneratorService.deleteInvoiceClient().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countInvoiceClient() {
    const value = <GeneralResponse>await this.reportGeneratorService.countInvoiceClient().toPromise();
    return value.data;
  }

  deleteMasterReport() {
    this.reportGeneratorService.deleteMasterReport().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countMasterReport() {
    const value = <GeneralResponse>await this.reportGeneratorService.countMasterReport().toPromise();
    return value.data;
  }

  deleteAssistantReport() {
    this.reportGeneratorService.deleteAssistantReport().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countAssistantReport() {
    const value = <GeneralResponse>await this.reportGeneratorService.countAssistantReport().toPromise();
    return value.data;
  }


  deletePaymentOriginal() {
    this.reportGeneratorService.deletePaymentOriginal().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countPaymentOriginal() {
    const value = <GeneralResponse>await this.reportGeneratorService.countPaymentOriginal().toPromise();
    return value.data;
  }


  deletePaymentExtra() {
    this.reportGeneratorService.deletePaymentExtra().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Información eliminada correctamente.');
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }
  async countPaymentExtra() {
    const value = <GeneralResponse>await this.reportGeneratorService.countPaymentExtra().toPromise();
    return value.data;
  }
}
