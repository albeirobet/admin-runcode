import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ConfirmationService } from 'primeng/api';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { HttpResponse } from '@angular/common/http';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { IReportUploader } from 'src/app/model/reports/report-uploader';
import { AppConstants } from 'src/app/utils/constants/app-constants';

type EntityResponseType = HttpResponse<GeneralResponse>;

@Component({
  selector: 'app-download-reports',
  templateUrl: './download-reports.component.html',
  styleUrls: ['./download-reports.component.css'],
  providers: [DialogService]
})
export class DownloadReportsComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Generar y Descargar Información';

  loading: boolean = true;

  reportInfo: any = null;
  displayReportInfo: boolean = false;

  // --- Lista de tipos de informacion
  infoList?: IReportUploader[];

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
    this.getReportCreator();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      this.stopTimer();
    }
  }

  interval = null;
  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.getReportCreator();
      }, 10000);
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  /**
   * Obtiene la configuracion de reportes por empresa
   */
  getReportCreator() {
    this.loading = true;
    this.reportGeneratorService.getReportCreator().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        console.log(res)
        this.infoList = [];
        this.infoList = res.body.data;
        let inprocess = false;
        this.loading = false;
        this.infoList.forEach(element => {
          if (element.percentageCompletition &&
            parseInt(element.percentageCompletition) > 0 &&
            parseInt(element.percentageCompletition) < 100) {
            inprocess = true;
          }
        });
        if (inprocess && !this.interval) {
          setTimeout(() => {
            this.startTimer();
          }, 10000);
        } else {
          if (!inprocess && this.interval) {
            this.stopTimer();
          }
        }
      },
      error => {
        console.dir(error.error);
        this.loading = false;
      }
    );
  }

  downloadReport(info) {
    this.loading = true;
    switch (info.code) {
      case AppConstants.REPORT_GEN_SEGUIMIENTO_ENTRADA_SERVICIOS: {
        this.downloadEntryMerchandiseAndServicesReport(info);
        break;
      }
      default: {
        break;
      }
    }
  }

  generateReportPre(info) {
    if (info.counterRows && info.counterRows > 0) {
      this.confirmationService.confirm({
        message: 'Está seguro de generar el reporte '
          + info.name
          + '? \nEsto borrará la información procesada anteriormente.',
        accept: () => {
          this.generateReport(info);
        }
      });
    } else {
      this.generateReport(info);
    }
  }

  resendEmailWithReport(info) {
    this.loading = true;
    switch (info.code) {
      case AppConstants.REPORT_GEN_SEGUIMIENTO_ENTRADA_SERVICIOS: {
        this.downloadEntryMerchandiseAndServicesReport(info);
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * Generar Reporte
   */
  generateReport(info) {
    this.loading = true;
    switch (info.code) {
      case AppConstants.REPORT_GEN_SEGUIMIENTO_ENTRADA_SERVICIOS: {
        this.generateEntryMerchandiseAndServicesReport();
        break;
      }
      default: {
        break;
      }
    }
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

  generateEntryMerchandiseAndServicesReport() {
    this.loading = true;
    this.reportGeneratorService.generateEntryMerchandiseAndServicesReport().subscribe(
      event => {
        console.log('File is completely uploaded! ', event);
        this.notificationService.success('Se ha iniciado la generación del reporte, '
          + 'por favor valide en un momento su información');
        this.infoList.forEach(element => {
          if (element.code === AppConstants.REPORT_GEN_SEGUIMIENTO_ENTRADA_SERVICIOS) {
            element.counterRows = '0';
            element.percentageCompletition = '0';
            element.message = 'GENERACIÓN DE REPORTE EN PROCESO';
          }
        });
        this.startTimer();
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  downloadEntryMerchandiseAndServicesReport(info) {
    this.loading = true;
    this.reportGeneratorService.downloadEntryMerchandiseAndServicesReport().subscribe(
      data => {
        console.log(data.body)
        this.reportInfo = data.body.data;
        this.notificationService.success('Se ha iniciado la generación del reporte para reenviar reporte a su correo, '
          + 'por favor valide en un momento su información');
        this.infoList.forEach(element => {
          if (element.code === AppConstants.REPORT_GEN_SEGUIMIENTO_ENTRADA_SERVICIOS) {
            element.message = 'REENVIANDO REPORTE A CORREO ELECTRÓNICO DEL USUARIO';
          }
        });
        this.startTimer();
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.error.apiError.messageUser);
      }
    );
  }

  downloadFile(data, header, info) {
    console.log(header)
    let blob = new Blob([data],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        //type: "application/vnd.ms-excel"
      }
    );
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = info.name + ".xlsx";
    anchor.href = url;
    anchor.click();
    this.loading = false;
    /*if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileUrl.split(":")[1] + ".xlsx");
    } else {*/
    //window.open(fileUrl);
    //}
    /*const blob = new Blob([data], { type: 'application/octet-stream' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);*/
  }

}
