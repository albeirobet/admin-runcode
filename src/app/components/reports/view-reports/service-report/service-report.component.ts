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
import { IService } from 'src/app/model/reports/service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.css'],
  providers: [DialogService]
})
export class ServiceReportComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Servicios';

  // --- Lista de registros de Servicios
  services?: IService[];

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de Servicios
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

  /**
   * Formulario de filtros
   */
  filterServicesForm = new FormGroup({
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
  }

  cleanServicesForm() {
    this.filterServicesForm.reset();
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   * de servicios
   */
  loadServicesList(event: LazyLoadEvent) {
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

    if (event.globalFilter) {
      this.pagedRequest.filter = event.globalFilter;
    }

    this.getServices();
  }

  /**
   * Obtiene todos los servicios
   */
  getServices() {
    this.loading = true;
    console.log(this.pagedRequest)
    this.reportGeneratorService.getServices(this.pagedRequest).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.services = res.body.data.dataLst;
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
  onSearchServicesFormSubmit() {
    let filterForm = this.filterServicesForm.value;

    this.pagedRequest = new PagedRequest;
    this.pagedRequest.order = 'desc';
    this.pagedRequest.sort = 'name';
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;

    if(filterForm.filter) {
      filterForm.filter = filterForm.filter.trim(); // Remove whitespace
      filterForm.filter = filterForm.filter.toLowerCase();
      this.pagedRequest.filter = filterForm.filter;
    }
    if(filterForm.initDate) {
      const auxInitDate = new Date(filterForm.initDate);
      const yearInit = auxInitDate.getFullYear();
      const monthInit = auxInitDate.getMonth();
      const dayInit = auxInitDate.getDate();
      var formattedInitDate = new Date(yearInit,monthInit,dayInit).toISOString().split('T')[0];
      this.pagedRequest.initDate = formattedInitDate;
    }
    if(filterForm.endDate) {
      const auxEndDate = new Date(filterForm.endDate);
      const yearEnd = auxEndDate.getFullYear();
      const monthEnd = auxEndDate.getMonth();
      const dayEnd = auxEndDate.getDate();
      var formattedEndDate = new Date(yearEnd,monthEnd,dayEnd).toISOString().split('T')[0];
      this.pagedRequest.endDate = formattedEndDate;
    }
    this.getServices();
  }

}
