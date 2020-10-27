import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassRequest } from 'src/app/model/access-control/forgot-pass-request';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { LoginService } from 'src/app/services/auth/login.service';
import { NotificationService } from 'src/app/services/common/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loading: boolean = false;

  forgotPasswordForm = this.fb.group({
    email: [null, [Validators.required, Validators.maxLength(100)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    protected loginService: LoginService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  /**
   * Restablecer Password
   */
  forgotPassword(): void {
    this.loading = true;
    let forgotPassword = new ForgotPassRequest();
    forgotPassword.email = this.forgotPasswordForm.get(['email'])!.value;
    this.loginService.forgotPassword(forgotPassword).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        this.notificationService.success('Te enviamos un correo con los datos para actualizar tu contraseña.');
        this.forgotPasswordForm.reset();
        this.loading = false;
      },
      error => {
        console.dir(error.error);
        this.loading = false;
      }
    );
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
