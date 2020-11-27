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
import { Utilities } from 'src/app/utils/utilities';

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

  // --- Fecha Maxima de seleccion
  maxDate = new Date();
  es: any;

  /**
   * Formulario de filtros
   */
  filterMasterReportForm = new FormGroup({
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
    if(filterForm.initDate && filterForm.endDate) {
      params = params + '&postingDate[gte]='+Utilities.getFormattedDate(filterForm.initDate);
      params = params + '&postingDate[lt]='+Utilities.getFormattedFinalDate(filterForm.endDate);
    }
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
