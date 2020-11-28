import { Component, Input, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/app/utils/constants/pagination.constants';
import { Subscription, combineLatest } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PagedRequest } from 'src/app/model/commons/request/paged-request';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ConfirmationService } from 'primeng/api';
import { IClient } from 'src/app/model/reports/client';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { ISupplier } from 'src/app/model/reports/supplier';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier-report',
  templateUrl: './supplier-report.component.html',
  styleUrls: ['./supplier-report.component.css'],
  providers: [DialogService]
})
export class SupplierReportComponent implements OnInit {

  // --- Titulo de los componentes
  @Input()
  titleComponent: string = null;

  // --- Lista de registros de Proveedores
  suppliers?: ISupplier[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de proveedores
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
  filterSuppliersForm = new FormGroup({
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

  cleanSuppliersForm() {
    this.filterSuppliersForm.reset();
    this.onSearchSuppliersFormSubmit();
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   * de proveedores
   */
  loadSuppliersList(event: LazyLoadEvent) {
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

    this.getSuppliers();
  }

  /**
   * Obtiene todos los proveedores
   */
  getSuppliers() {
    this.loading = true;
    console.log(this.pagedRequest)

    let filterForm = this.filterSuppliersForm.value;

    let params = '?page='+this.pagedRequest.page;
    params = params + '&limit='+this.pagedRequest.limit;
    if(filterForm.filter) {
      params = params + '&filter='+filterForm.filter.trim();
    }

    this.reportGeneratorService.getSuppliers(params).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.suppliers = res.body.data.dataLst;
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
  onSearchSuppliersFormSubmit() {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;

    this.getSuppliers();
  }

}
