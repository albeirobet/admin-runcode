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

    let counter = await this.counter();
    console.log(counter);

    this.infoList.push({ type: 'Clientes', code: 'CLI', numReg: counter.find(data => data.code === 'CLI').counter, id: 1 });
    this.infoList.push({ type: 'Proveedores', code: 'PRO', numReg: counter.find(data => data.code === 'PRO').counter, id: 2 });
    this.infoList.push({ type: 'Servicios', code: 'SER', numReg: counter.find(data => data.code === 'SER').counter, id: 3 });
    this.infoList.push({ type: 'Materiales', code: 'MAT', numReg: counter.find(data => data.code === 'MAT').counter, id: 4 });
    this.infoList.push({ type: 'Pedidos de Compra', code: 'PDC', numReg: counter.find(data => data.code === 'PDC').counter, id: 5 });
    this.infoList.push({ type: 'Entrada de Mercancias', code: 'EDM', numReg: counter.find(data => data.code === 'EDM').counter, id: 6 });
    this.infoList.push({ type: 'Factura Proveedores', code: 'FPR', numReg: counter.find(data => data.code === 'FPR').counter, id: 7 });
    this.infoList.push({ type: 'Retenciones Proveedores', code: 'RPR', numReg: counter.find(data => data.code === 'RPR').counter, id: 8 });
    this.infoList.push({ type: 'Facturas de Ventas', code: 'FDV', numReg: counter.find(data => data.code === 'FDV').counter, id: 9 });
    this.infoList.push({ type: 'Pagos y Depositos', code: 'PYD', numReg: counter.find(data => data.code === 'PYD').counter, id: 10 });
    this.infoList.push({ type: 'Cuentas Contables', code: 'CCO', numReg: counter.find(data => data.code === 'CCO').counter, id: 11 });
    this.infoList.push({ type: 'Documentos Facturas', code: 'DOF', numReg: counter.find(data => data.code === 'DOF').counter, id: 12 });
    this.infoList.push({ type: 'Pagos Extra', code: 'PEX', numReg: counter.find(data => data.code === 'PEX').counter, id: 13 });
    this.infoList.push({ type: 'Iva', code: 'IVA', numReg: counter.find(data => data.code === 'IVA').counter, id: 14 });
    this.infoList.push({ type: 'Entrada de Mercancias Extra', code: 'EDE', numReg: counter.find(data => data.code === 'EDE').counter, id: 16});
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
        this.notificationService.success('Se ha iniciado la carga de información, por favor valide en un momento su información');
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
      case 'EDE': {
        this.deleteEntryMerchandisesExtra();
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
      case 'IVA': {
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
        this.loadInfo();
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  async counter() {
    const value = <GeneralResponse>await this.reportGeneratorService.counter().toPromise();
    console.log(value)
    return value.data;
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

  deleteEntryMerchandisesExtra() {
    this.reportGeneratorService.deleteEntryMerchandiseExtra().subscribe(
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
  async countEntryMerchandiseExtra() {
    const value = <GeneralResponse>await this.reportGeneratorService.countEntryMerchandiseExtra().toPromise();
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

  deleteIvaData() {
    this.reportGeneratorService.deleteIva().subscribe(
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
}
