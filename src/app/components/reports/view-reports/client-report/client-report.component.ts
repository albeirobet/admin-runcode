import { Component, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/app/utils/constants/pagination.constants';
import { Subscription, combineLatest } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PagedRequest } from 'src/app/model/commons/request/paged-request';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import {ConfirmationService} from 'primeng/api';
import { IClient } from 'src/app/model/reports/client';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.css'],
  providers: [DialogService]
})
export class ClientReportComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Reporte de Clientes';

  // --- Lista de registros de clientes
  clients?: IClient[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de clientes
  pagedRequest: PagedRequest;
  search: string;
  loading: boolean = true;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(protected reportGeneratorService: ReportGeneratorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
    ) {
  }

  ngOnInit(): void {
    console.log('entro a clientes')
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   * de clientes
   */
  loadClientsList(event: LazyLoadEvent) {
    console.log(event);
    let pageNumber = 0;
    let rowsNumber = event.rows ? event.rows : 10;
    if (event.first !== 0) {
      pageNumber = (event.first / rowsNumber);
    }
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.order = 'desc';
    this.pagedRequest.sort = 'name';
    this.pagedRequest.page = pageNumber + 1;
    this.pagedRequest.limit = rowsNumber;

    if(event.globalFilter) {
      this.pagedRequest.filter = event.globalFilter;
    }
    
    this.getClients();
  }

  /**
   * Obtiene todos los clientes
   */
  getClients() {
    this.loading = true;
    console.log(this.pagedRequest)
    this.reportGeneratorService.getClients(this.pagedRequest, this.search).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.clients = res.body.data.dataLst;
        this.totalRecords = res.body.data.total;
        this.loading = false;

      },
      error => {
        console.dir(error.error);
        this.loading = false;
      }
    );
  }

  /**
   * 
   * @param filterValue 
   */
  aplicarFiltro(filterValue) {
    console.log(filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();    
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.order = 'desc';
    this.pagedRequest.sort = 'name';
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;
    this.pagedRequest.filter = filterValue;
    this.getClients();
  }

}
