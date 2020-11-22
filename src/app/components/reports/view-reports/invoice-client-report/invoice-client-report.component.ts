import { Component, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/app/utils/constants/pagination.constants';
import { Subscription, combineLatest } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PagedRequest } from 'src/app/model/commons/request/paged-request';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { IInvoiceClient } from 'src/app/model/reports/invoice-client';

@Component({
  selector: 'app-invoice-client-report',
  templateUrl: './invoice-client-report.component.html',
  styleUrls: ['./invoice-client-report.component.css'],
  providers: [DialogService]
})
export class InvoiceClientReportComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Facturas de Ventas';

  // --- Lista de registros de facturas de ventas
  invoiceClients?: IInvoiceClient[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de facturas de ventas
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
    public dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   * de entrada de mercancias
   */
  loadInvoiceClientList(event: LazyLoadEvent) {
    console.log(event);
    let pageNumber = 0;
    let rowsNumber = event.rows ? event.rows : 10;
    if (event.first !== 0) {
      pageNumber = (event.first / rowsNumber);
    }
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = pageNumber + 1;
    this.pagedRequest.limit = rowsNumber;

    if (event.globalFilter) {
      this.pagedRequest.filter = event.globalFilter;
    }

    this.getInvoiceClient();
  }

  /**
   * Obtiene todas las facturas de ventas
   */
  getInvoiceClient() {
    this.loading = true;
    console.log(this.pagedRequest)
    this.reportGeneratorService.getInvoiceClient(this.pagedRequest, this.search).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.invoiceClients = res.body.data.dataLst;
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
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;
    this.pagedRequest.filter = filterValue;
    this.getInvoiceClient();
  }

}
