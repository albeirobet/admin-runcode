import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import {ConfirmationService} from 'primeng/api';
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
      this.countPaymentOriginal()
     ]);
     
    this.infoList.push({type: 'Clientes', code: 'CLI', numReg: responses[0]});
    this.infoList.push({type: 'Proveedores', code: 'PRO',numReg: responses[1]});
    this.infoList.push({type: 'Servicios', code: 'SER',numReg: responses[2]});
    this.infoList.push({type: 'Materiales', code: 'MAT',numReg: responses[3]});
    this.infoList.push({type: 'Pedidos de Compra', code: 'PDC',numReg: responses[4]});
    this.infoList.push({type: 'Entrada de Mercancias', code: 'EDM',numReg: responses[5]});
    this.infoList.push({type: 'Factura Proveedores', code: 'FPR',numReg: responses[6]});
    this.infoList.push({type: 'Retenciones Proveedores', code: 'RPR',numReg: responses[7]});
    this.infoList.push({type: 'Facturas de Ventas', code: 'FDV',numReg: responses[8]});
    this.infoList.push({type: 'Pagos y Depositos', code: 'PYD',numReg: responses[9]});
    this.infoList.push({type: 'Cuentas Contables', code: 'CCO',numReg: responses[10]});
    this.infoList.push({type: 'Documentos Facturas', code: 'DOF',numReg: responses[11]});
    this.loading = false;
  }

  uploadFile(info: any): void {
    const ref = this.dialogService.open(FileUploadComponent, {
        data: info,
        header: 'Cargar Información ['+info.type+']',
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
        message: 'Está seguro de eliminar la información de ['+info.type+'] ?',
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
    switch(info.code) { 
      case 'CLI': { 
         this.deleteClients();
         break; 
      } 
      case 'PRO': { 
        break; 
      }
      case 'SER': { 
        break; 
      } 
      case 'MAT': { 
        break; 
      } 
      case 'PDC': { 
        break; 
      } 
      case 'EDM': { 
        break; 
      } 
      case 'FPR': { 
        break; 
      } 
      case 'RPR': { 
        break; 
      } 
      case 'FDV': { 
        break; 
      } 
      case 'PYD': { 
        break; 
      } 
      case 'CCO': { 
        break; 
      } 
      case 'DOF': { 
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

  async countSuppliers() {
    const value = <GeneralResponse>await this.reportGeneratorService.countSuppliers().toPromise();
    return value.data;
  }

  async countServices() {
    const value = <GeneralResponse>await this.reportGeneratorService.countServices().toPromise();
    return value.data;
  }

  async countMaterials() {
    const value = <GeneralResponse>await this.reportGeneratorService.countMaterials().toPromise();
    return value.data;
  }

  async countPurchaseOrders() {
    const value = <GeneralResponse>await this.reportGeneratorService.countPurchaseOrders().toPromise();
    return value.data;
  }

  async countEntryMerchandises() {
    const value = <GeneralResponse>await this.reportGeneratorService.countEntryMerchandises().toPromise();
    return value.data;
  }

  async countInvoiceSupplier() {
    const value = <GeneralResponse>await this.reportGeneratorService.countInvoiceSupplier().toPromise();
    return value.data;
  }

  async countRetentionSupplier() {
    const value = <GeneralResponse>await this.reportGeneratorService.countRetentionSupplier().toPromise();
    return value.data;
  }

  async countInvoiceClient() {
    const value = <GeneralResponse>await this.reportGeneratorService.countInvoiceClient().toPromise();
    return value.data;
  }

  async countMasterReport() {
    const value = <GeneralResponse>await this.reportGeneratorService.countMasterReport().toPromise();
    return value.data;
  }

  async countAssistantReport() {
    const value = <GeneralResponse>await this.reportGeneratorService.countAssistantReport().toPromise();
    return value.data;
  }

  async countPaymentOriginal() {
    const value = <GeneralResponse>await this.reportGeneratorService.countPaymentOriginal().toPromise();
    return value.data;
  }
}
