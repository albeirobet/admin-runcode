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
import { IPurchaseOrder } from 'src/app/model/reports/purchase-order';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPurchaseOrderTracking } from 'src/app/model/reports/purchase-order-tracking';

@Component({
  selector: 'app-purchase-orders-tracking-report',
  templateUrl: './purchase-orders-tracking-report.component.html',
  styleUrls: ['./purchase-orders-tracking-report.component.css'],
  providers: [DialogService]
})
export class PurchaseOrdersTrackingReportComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Pedidos de Compra V1';

  // --- Lista de registros de ordenes de compra
  purchaseOrdersTracking?: IPurchaseOrderTracking[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de ordenes de compra
  pagedRequest: PagedRequest;
  search: string;
  loading: boolean = true;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  /**
   * Formulario de filtros
   */
  filterPurchaseOrdersTrackingForm = new FormGroup({
    filter: new FormControl(null, Validators.nullValidator),
  });

  constructor(protected reportGeneratorService: ReportGeneratorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
  }

  cleanPurchaseOrdersTrackingForm() {
    this.filterPurchaseOrdersTrackingForm.reset();
    this.onSearchPurchaseOrdersTrackingFormSubmit();
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   */
  loadPurchaseOrdersTrackingList(event: LazyLoadEvent) {
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

    this.getPurchaseOrdersTracking();
  }

  /**
   * Obtiene todas las ordenes de compra
   */
  getPurchaseOrdersTracking() {
    this.loading = true;
    console.log(this.pagedRequest)

    let filterForm = this.filterPurchaseOrdersTrackingForm.value;

    let params = '?page='+this.pagedRequest.page;
    params = params + '&limit='+this.pagedRequest.limit;
    if(filterForm.filter) {
      params = params + '&filter='+filterForm.filter.trim();
    }

    this.reportGeneratorService.getPurchaseOrders(params).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.purchaseOrdersTracking = res.body.data.dataLst;
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
  onSearchPurchaseOrdersTrackingFormSubmit() {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;

    this.getPurchaseOrdersTracking();
  }

}
