import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  /**
   * Formulario para LOGIN
   */
  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.pattern(AppConstants.REGEX_EMAIL)]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private loginService: LoginService,
    private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  /**
   * Metodo que realiza el submit del formulario para LOGIN
   */
  login(): void {
    this.loading = true;
    this.loginService
      .login({
        email: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
      })
      .subscribe(
        (data) => {
          console.log(data)
          this.loading = false;
          this.notificationService.success('Bienvenido '+data.data.user.name);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log('error: ', error);
          this.notificationService.error(error.error.apiError.messageUser);
          this.loading = false;
        }
      );
  }

  createAccount(): void{
    this.router.navigate(['/register']);
  }

  forgotPass(): void{
    this.router.navigate(['/forgot-password']);
  }

}
