import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPassRequest } from 'src/app/model/access-control/forgot-pass-request';
import { ResetPassRequest } from 'src/app/model/access-control/reset-pass-request';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { LoginService } from 'src/app/services/auth/login.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MustMatch } from 'src/app/utils/validator/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loading: boolean = false;

  /**
   * code
   */
  code: string = null;

  resetPasswordForm = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    passwordConfirm: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
  }, {
    validator: MustMatch('password', 'passwordConfirm')
  });

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected loginService: LoginService,
    private notificationService: NotificationService,
    private authService: AuthService) { 
      this.code = this.route.snapshot.paramMap.get('code');
    }

  ngOnInit(): void {
  }

  /**
   * Restablecer Password
   */
  updatePassword(): void {

    let resetPassRequest = new ResetPassRequest();
    resetPassRequest.password = this.resetPasswordForm.get(['password'])!.value;
    resetPassRequest.passwordConfirm = this.resetPasswordForm.get(['passwordConfirm'])!.value;
    console.log(resetPassRequest, this.code)
    this.loading = true;
    this.loginService.resetPassword(resetPassRequest, this.code).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Contraseña actualizada correctamente.');
        this.authService.authenticateSuccess(res.body, true);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.loading = false;
        console.dir(error.error);
        if(error.error.apiError.code == 'E_ACCESS_CONTROL_MS_11') {
          this.notificationService.error(error.error.apiError.messageUser);
        } else {
          this.notificationService.error('Ha ocurrido un error. Por favor intente nuevamente restablecerlo.');
        }
        this.loading = false;
        this.router.navigate(['/forgot-password']);
      }
    );
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
