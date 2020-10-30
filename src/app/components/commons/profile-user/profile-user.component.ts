import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUpdatePassRequest, UpdatePassRequest } from 'src/app/model/access-control/update-pass-request';
import { IUser, User } from 'src/app/model/access-control/user';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { AccountService } from 'src/app/services/auth/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/business-users/user.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { MustMatch } from 'src/app/utils/validator/must-match.validator';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  user!: IUser;
  loading: boolean = false;

  constructor(private accountService: AccountService,
    protected userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private authService: AuthService) { }

  /**
   * Formulario actualizacion de informacion de usuario
   */
  userForm = this.fb.group({
      _id: [],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      lastname: [null, [Validators.required, Validators.maxLength(50)]],
      email: [{value: null, disabled: true}, Validators.required],
      active: [],
      authorities: [],
      password: [],
      passwordConfirm: []
    });

  /**
   * Formulario actualizacion de password
   */
  updatePasswordForm = this.fb.group({
      _id: [],
      actualpassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      newpassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      passwordConfirm: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    }, {
      validator: MustMatch('newpassword', 'passwordConfirm')
    });

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        console.log(account.data)
        this.userForm.patchValue({
          _id: account.data.user._id,
          email: account.data.user.email,
          name: account.data.user.name,
          lastname: account.data.user.lastname,
          active: account.data.user.active,
          authorities: account.data.user.authorities,
          password: account.data.user.password,
          passwordConfirm: account.data.user.passwordConfirm
        });

        this.updatePasswordForm.patchValue({
          _id: account.data.user._id
        });

        this.user = account.data.user;
        this.user.authorities = account.data.authorities;
      }
    });
  }

  private createFromForm(): IUser {
    return {
      ...new User(),
      _id: this.userForm.get(['_id'])!.value,
      name: this.userForm.get(['name'])!.value,
      lastname: this.userForm.get(['lastname'])!.value,
      email: this.userForm.get(['email'])!.value,
      active: this.userForm.get(['active'])!.value,
      password: this.userForm.get(['password'])!.value,
      passwordConfirm: this.userForm.get(['passwordConfirm'])!.value
    };
  }

  /**
   * Guardar informacion del usuario en el sistema
   */
  save(): void {
    this.loading = true;
    const user = this.createFromForm();
    this.subscribeToSaveResponse(this.userService.update(user));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<GeneralResponse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      (error) => this.onSaveError(error)
    );
  }

  protected onSaveSuccess(): void {
    this.loading = false;
    this.notificationService.success('Usuario actualizado correctamente.');
  }

  protected onSaveError(error): void {
    console.log(error)
    this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
    this.loading = false;
  }

  /**
   * Actualizar password
   */
  updatePassword(): void {
    this.loading = true;
    const updatePasswordReq = this.createFromUpdatePassForm();

    this.userService.updatePassword(updatePasswordReq).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Contraseña actualizada correctamente.');
        this.updatePasswordForm.reset();
        this.updatePasswordForm.patchValue({
          _id: this.user._id
        });
        this.authService.authenticateSuccess(res.body, true);
        this.loading = false;
      },
      error => {
        console.dir(error.error);
        console.log(error)
        if(error.error.apiError.code == 'E_ACCESS_CONTROL_MS_12') {
          this.notificationService.error('La contraseña actual no es correcta, por favor verifica los datos.');
        } else {
          this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        }
        this.loading = false;
      }
    );
  }

  private createFromUpdatePassForm(): IUpdatePassRequest {
    return {
      ...new UpdatePassRequest(),
      _id: this.updatePasswordForm.get(['_id'])!.value,
      passwordCurrent: this.updatePasswordForm.get(['actualpassword'])!.value,
      password: this.updatePasswordForm.get(['newpassword'])!.value,
      passwordConfirm: this.updatePasswordForm.get(['passwordConfirm'])!.value
    };
  }
  

}
