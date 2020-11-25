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
import { IAssistantReport } from 'src/app/model/reports/assistant-report';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assistant-report',
  templateUrl: './assistant-report.component.html',
  styleUrls: ['./assistant-report.component.css'],
  providers: [DialogService]
})
export class AssistantReportComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Documentos Facturas';

  // --- Lista de registros
  assistantReports?: IAssistantReport[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla 
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
  filterAssistantReportForm = new FormGroup({
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

  cleanAssistantReportForm() {
    this.filterAssistantReportForm.reset();
    this.onSearchAssistantReportFormSubmit();
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   */
  loadAssistantReportList(event: LazyLoadEvent) {
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

    this.getAssistantReport();
  }

  /**
   * Obtiene todos los registros
   */
  getAssistantReport() {
    this.loading = true;
    console.log(this.pagedRequest)

    let filterForm = this.filterAssistantReportForm.value;

    let params = '?page='+this.pagedRequest.page;
    params = params + '&limit='+this.pagedRequest.limit;
    if(filterForm.filter) {
      params = params + '&filter='+filterForm.filter.trim();
    }

    this.reportGeneratorService.getAssistantReport(params).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.assistantReports = res.body.data.dataLst;
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
  onSearchAssistantReportFormSubmit() {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;

    this.getAssistantReport();
  }

}
