import { Component, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/app/utils/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PagedRequest } from 'src/app/model/commons/request/paged-request';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { IRetentionSupplier } from 'src/app/model/reports/retention-supplier';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-retention-supplier-report',
  templateUrl: './retention-supplier-report.component.html',
  styleUrls: ['./retention-supplier-report.component.css'],
  providers: [DialogService]
})
export class RetentionSupplierReportComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Retenciones a Proveedores';

  // --- Lista de registros de retenciones a proveedores
  retentionSupplier?: IRetentionSupplier[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de retenciones a proveedores
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
  filterRetentionSupplierForm = new FormGroup({
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

  cleanRetentionSupplierForm() {
    this.filterRetentionSupplierForm.reset();
    this.onSearchRetentionSupplierFormSubmit();
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   * de retenciones a proveedores
   */
  loadRetentionSupplierList(event: LazyLoadEvent) {
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

    this.getRetentionSupplier();
  }

  /**
   * Obtiene todas las retenciones a proveedores
   */
  getRetentionSupplier() {
    this.loading = true;
    console.log(this.pagedRequest)

    let filterForm = this.filterRetentionSupplierForm.value;

    let params = '?page='+this.pagedRequest.page;
    params = params + '&limit='+this.pagedRequest.limit;
    if(filterForm.filter) {
      params = params + '&filter='+filterForm.filter.trim();
    }

    this.reportGeneratorService.getRetentionSupplier(params).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.retentionSupplier = res.body.data.dataLst;
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
  onSearchRetentionSupplierFormSubmit() {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;

    this.getRetentionSupplier();
  }

}
