import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IRol } from 'src/app/model/access-control/rol';
import { IUser, User } from 'src/app/model/access-control/user';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { RolService } from 'src/app/services/business-users/rol.service';
import { UserService } from 'src/app/services/business-users/user.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {

  // --- Lista de roles
  roles?: IRol[];

  // --- Usuario a editar
  user?: IUser;

  loading: boolean = false;

  editForm = this.fb.group({
    _id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    lastname: [null, [Validators.required, Validators.maxLength(50)]],
    email: [null, [Validators.required, Validators.pattern(AppConstants.REGEX_EMAIL)]],
    active: [],
    authorities: []
  });

  constructor(protected rolService: RolService,
    protected userService: UserService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { 
      if(config.data) {
        this.user = config.data;  
      }
    }

  ngOnInit(): void {
    this.getRoles();
  }

  /**
   * Obtener roles 
   */
  getRoles(): void {
    this.loading = true;
    this.rolService.query().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.roles = res.body.data;

        // --- si es edicion se actualiza el formulario con los datos
        if(this.user) {
          this.updateForm(this.user);
        }
        this.loading = false;
      },
      error => {
        console.dir(error.error);
        this.loading = false;
      }
    );
  }

  /**
   * Actualizar valores del usuario en el formulario
   * @param user 
   */
  updateForm(user: IUser): void {

    // --- Setear roles del usuario
    let rolesUser = [];
    this.roles.forEach(rol => {
      user.authorities.forEach(authorityUser => {
        if(rol._id === authorityUser) {
          rolesUser.push(rol);
        }
      });
    });

    // --- actualizar los valores del usuario en el formulario
    this.editForm.patchValue({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      active: user.active,
      authorities: rolesUser
    });
  }

  /**
   * Guardar informacion del usuario en el sistema
   */
  save(): void {
    const user = this.createFromForm();
    user.authorities = [];
    this.editForm.get(['authorities'])!.value.forEach(authority => {
      user.authorities.push(authority._id);
    });
    this.loading = true;
    if (user._id) {
      this.subscribeToSaveResponse(this.userService.update(user));
    } else {
      user.active = true;
      this.subscribeToSaveResponse(this.userService.create(user));
    }
  }

  private createFromForm(): IUser {
    return {
      ...new User(),
      _id: this.editForm.get(['_id'])!.value,
      name: this.editForm.get(['name'])!.value,
      lastname: this.editForm.get(['lastname'])!.value,
      email: this.editForm.get(['email'])!.value,
      active: this.editForm.get(['active'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<GeneralResponse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.loading = false;
    this.ref.close(true);
  }

  protected onSaveError(): void {
    this.loading = false;
  }

  close(): void {
    this.ref.close(null);
  }

}
