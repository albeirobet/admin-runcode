import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/access-control/user';
import { UserService } from 'src/app/services/business-users/user.service';
import { ITEMS_PER_PAGE } from 'src/app/utils/constants/pagination.constants';
import { Subscription, combineLatest } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PagedRequest } from 'src/app/model/commons/request/paged-request';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { NotificationService } from 'src/app/services/common/notification.service';
import {ConfirmationService} from 'primeng/api';
import { ICompany } from 'src/app/model/enterprise-information/company';
import { CreateEditCompanyComponent } from '../create-edit-company/create-edit-company.component';
import { CompanyDataService } from 'src/app/services/enterprise-information/company-data.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css'],
  providers: [DialogService]
})
export class ListCompaniesComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Listado de Empresas';
  userDialogTitle: string = null;

  // --- Lista de empresas
  companies?: ICompany[];

  // --- Empresa seleccionada o a crear
  company: ICompany;

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de empresas
  pagedRequest: PagedRequest;
  search: string;
  loading: boolean = true;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(protected companyDataService: CompanyDataService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
    ) {
  }

  ngOnInit(): void {
  }

  /**
   * Metodo que se lanza en los eventos de la tabla
   * de empresas
   */
  loadCompaniesList(event: LazyLoadEvent) {
    console.log(event);
    let pageNumber = 0;
    let rowsNumber = event.rows ? event.rows : 10;
    if (event.first !== 0) {
      pageNumber = (event.first / rowsNumber);
    }
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = pageNumber + 1;
    this.pagedRequest.limit = rowsNumber;

    if(event.globalFilter) {
      this.pagedRequest.filter = event.globalFilter;
    }
    
    this.getAllCompaniesTable();
  }

  /**
   * Obtiene todas las empresas
   */
  getAllCompaniesTable() {
    this.loading = true;
    console.log(this.pagedRequest)
    this.companyDataService.query(this.pagedRequest, this.search).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.companies = res.body.data.dataLst;
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
    this.getAllCompaniesTable();
  }

  /**
   * Abrir modal para crear empresa
   */
  openNewCompany() {
    this.company = {};
    const ref = this.dialogService.open(CreateEditCompanyComponent, {
        data: null,
        header: 'Crear Empresa',
        width: '50%'
    });
    ref.onClose.subscribe((response: Boolean) => {
      if (response) {
        this.notificationService.success('Empresa creado correctamente.');
        this.reloadCompanies();
      }
    });
  }

  /**
   * Abrir modal para editar una empresa
   */
  openEditCompany(companySelected: ICompany) {
    this.company = companySelected;
    const ref = this.dialogService.open(CreateEditCompanyComponent, {
        data: this.company,
        header: 'Editar Empresa',
        width: '50%'
    });
    ref.onClose.subscribe((response: Boolean) => {
      if (response) {
        this.notificationService.success('Empresa actualizada correctamente.');
        this.reloadCompanies();
      }
    });
  }

  /**
   * Abrir modal para eliminar una empresa
   */
  deleteCompany(companySelected: ICompany) {
    this.loading = true;
    this.companyDataService.delete(companySelected._id).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Empresa eliminada correctamente.');
        this.reloadCompanies();
        this.loading = false;
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  confirmDeleteCompany(companySelected: ICompany) {
    console.log(companySelected)
    this.confirmationService.confirm({
        message: 'Está seguro de eliminar esta empresa?',
        accept: () => {
            this.deleteCompany(companySelected);
        }
    });
  }

  reloadCompanies(): void {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;
    this.getAllCompaniesTable();
  }

}
