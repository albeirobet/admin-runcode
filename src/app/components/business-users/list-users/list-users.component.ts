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
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { IAccount } from 'src/app/model/access-control/account';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { NotificationService } from 'src/app/services/common/notification.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [DialogService]
})
export class ListUsersComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Listado de Usuarios';
  userDialogTitle: string = null;

  // --- Lista de usuarios
  users?: IAccount[];

  // --- Usuario seleccionado o a crear
  user: IUser;

  // --- Total de registros 
  totalRecords: number;

  // --- Loading para tabla de usuarios
  pagedRequest: PagedRequest;
  search: string;
  loading: boolean = true;

  // --- Indica si se muestra o no el dialog
  userDialog: boolean = false;

  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(protected userService: UserService,
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
   * de transacciones
   */
  loadUsersList(event: LazyLoadEvent) {
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

    if(event.globalFilter) {
      this.pagedRequest.filter = event.globalFilter;
    }
    
    this.getAllUsersTable();
  }

  /**
   * Obtiene todos los usuarios
   */
  getAllUsersTable() {
    this.loading = true;
    console.log(this.pagedRequest)
    this.userService.query(this.pagedRequest, this.search).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.users = res.body.data.userLst;
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
    this.pagedRequest.order = 'desc';
    this.pagedRequest.sort = 'name';
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;
    this.pagedRequest.filter = filterValue;
    this.getAllUsersTable();
  }

  /**
   * Abrir modal para crear usuario
   */
  openNewUser() {
    this.user = {};
    const ref = this.dialogService.open(CreateEditUserComponent, {
        data: null,
        header: 'Crear Usuario',
        width: '50%'
    });
    ref.onClose.subscribe((response: Boolean) => {
      if (response) {
        this.notificationService.success('Usuario creado correctamente.');
        this.reloadUsers();
      }
    });
  }

  /**
   * Abrir modal para editar un usuario
   */
  openEditUser(userSelected: IAccount) {
    this.user = userSelected.user;
    const ref = this.dialogService.open(CreateEditUserComponent, {
        data: this.user,
        header: 'Editar Usuario',
        width: '50%'
    });
    ref.onClose.subscribe((response: Boolean) => {
      if (response) {
        this.notificationService.success('Usuario actualizado correctamente.');
        this.reloadUsers();
      }
    });
  }

  /**
   * Abrir modal para eliminar un usuario
   */
  deleteUser(userSelected: IAccount) {
    this.loading = true;
    this.userService.delete(userSelected.user._id).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Usuario eliminado correctamente.');
        this.reloadUsers();
        this.loading = false;
      },
      error => {
        console.dir(error.error);
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        this.loading = false;
      }
    );
  }

  confirmDeleteUser(userSelected: IAccount) {
    console.log(userSelected)
    this.confirmationService.confirm({
        message: 'Está seguro de eliminar este usuario?',
        accept: () => {
            this.deleteUser(userSelected);
        }
    });
  }

  reloadUsers(): void {
    this.pagedRequest = new PagedRequest;
    this.pagedRequest.order = 'desc';
    this.pagedRequest.sort = 'name';
    this.pagedRequest.page = 1;
    this.pagedRequest.limit = 10;
    this.getAllUsersTable();
  }

}
