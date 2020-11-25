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
import { IMasterReport } from 'src/app/model/reports/master-report';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-master-report',
  templateUrl: './master-report.component.html',
  styleUrls: ['./master-report.component.css'],
  providers: [DialogService]
})
export class MasterReportComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Cuentas Contables y Documentos';

  // --- Lista de registros de pagos y deposito
  masterReports?: IMasterReport[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de pagos y deposito
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
  filterMasterReportForm = new FormGroup({
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

  cleanMasterReportForm() {
    this.filterMasterReportForm.reset();
    this.onSearchMasterReportFormSubmit();
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   * de pagos y deposito
   */
  loadMasterReportList(event: LazyLoadEvent) {
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

    this.getMasterReport();
  }

  /**
   * Obtiene todas las pagos y deposito
   */
  getMasterReport() {
    this.loading = true;
    console.log(this.pagedRequest)

    let filterForm = this.filterMasterReportForm.value;

    let params = '?page='+this.pagedRequest.page;
    params = params + '&limit='+this.pagedRequest.limit;
    if(filterForm.filter) {
      params = params + '&filter='+filterForm.filter.trim();
    }

    this.reportGeneratorService.getMasterReport(params).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.masterReports = res.body.data.dataLst;
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
  onSearchMasterReportFormSubmit() {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;

    this.getMasterReport();
  }

}
