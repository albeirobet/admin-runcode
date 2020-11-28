import { Component, Input, OnInit } from '@angular/core';
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utilities } from 'src/app/utils/utilities';

@Component({
  selector: 'app-invoice-client-report',
  templateUrl: './invoice-client-report.component.html',
  styleUrls: ['./invoice-client-report.component.css'],
  providers: [DialogService]
})
export class InvoiceClientReportComponent implements OnInit {

  // --- Titulo de los componentes
  @Input()
  titleComponent: string = null;

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

  // --- Fecha Maxima de seleccion
  maxDate = new Date();
  es: any;

  /**
   * Formulario de filtros
   */
  filterInvoiceClientForm = new FormGroup({
    initDate: new FormControl(null, Validators.nullValidator),
    endDate: new FormControl(null, Validators.nullValidator),
    filter: new FormControl(null, Validators.nullValidator),
  });

  constructor(protected reportGeneratorService: ReportGeneratorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

  cleanInvoiceClientForm() {
    this.filterInvoiceClientForm.reset();
    this.onSearchInvoiceClientFormSubmit();
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

    let filterForm = this.filterInvoiceClientForm.value;

    let params = '?page='+this.pagedRequest.page;
    params = params + '&limit='+this.pagedRequest.limit;
    if(filterForm.initDate && filterForm.endDate) {
      params = params + '&invoiceDate[gte]='+Utilities.getFormattedDate(filterForm.initDate);
      params = params + '&invoiceDate[lt]='+Utilities.getFormattedFinalDate(filterForm.endDate);
    }
    if(filterForm.filter) {
      params = params + '&filter='+filterForm.filter.trim();
    }

    this.reportGeneratorService.getInvoiceClient(params).subscribe(
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
   */
  onSearchInvoiceClientFormSubmit() {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;

    this.getInvoiceClient();
  }

}
