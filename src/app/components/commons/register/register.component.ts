import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IRol } from 'src/app/model/access-control/rol';
import { ISignUpRequest, SignUpRequest } from 'src/app/model/access-control/signup-request';
import { IUser, User } from 'src/app/model/access-control/user';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolService } from 'src/app/services/business-users/rol.service';
import { UserService } from 'src/app/services/business-users/user.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { MustMatch } from 'src/app/utils/validator/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;

  // --- Lista de roles
  roles?: IRol[];

  registerForm = this.fb.group({
    _id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    lastname: [null, [Validators.required, Validators.maxLength(50)]],
    email: [null, [Validators.required, Validators.pattern(AppConstants.REGEX_EMAIL)]],
    password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    passwordConfirm: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    active: [],
    authorities: []
  }, {
    validator: MustMatch('password', 'passwordConfirm')
  });

  constructor(private fb: FormBuilder,
    protected rolService: RolService,
    private router: Router,
    protected loginService: LoginService,
    private notificationService: NotificationService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Guardar informacion del usuario en el sistema
   */
  save(): void {
    const request = this.createFromFormRequest();
    this.loading = true;
    this.subscribeToSaveResponse(this.loginService.signUp(request));
  }

  private createFromFormRequest(): ISignUpRequest {
    return {
      ...new SignUpRequest(),
      name: this.registerForm.get(['name'])!.value,
      lastname: this.registerForm.get(['lastname'])!.value,
      email: this.registerForm.get(['email'])!.value,
      password: this.registerForm.get(['password'])!.value,
      passwordConfirm: this.registerForm.get(['passwordConfirm'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<GeneralResponse>>): void {
    result.subscribe(
      (res) => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res): void {
    this.notificationService.success('Usuario registrado correctamente.');
    this.authService.authenticateSuccess(res.body, true);
    this.router.navigate(['/dashboard']);
  }

  protected onSaveError(): void {
    this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
    this.loading = false;
  }

  close(): void {
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
