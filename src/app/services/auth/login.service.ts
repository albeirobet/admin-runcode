import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GeneralResponse } from '../../model/commons/response/general-response';
import { AccessControlConstants } from '../../utils/constants/access-control.constants';
import { IAuth } from '../../model/access-control/auth';
import { map } from 'rxjs/operators';
import { flatMap } from 'rxjs/operators';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { IUser } from '../../model/access-control/user';
import { ForgotPassRequest } from 'src/app/model/access-control/forgot-pass-request';
import { ResetPassRequest } from 'src/app/model/access-control/reset-pass-request';
import { SignUpRequest } from 'src/app/model/access-control/signup-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private accountService: AccountService, 
    private authService: AuthService,
    protected http: HttpClient) { }

  login(credentials: IAuth): Observable<GeneralResponse | null> {
    return this.authService.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authService.logout();
    this.accountService.authenticate(null);
  }

  /**
   * Restablecer password
   * @param forgotPass 
   */
  forgotPassword(forgotPass: ForgotPassRequest): Observable<HttpResponse<GeneralResponse>> {
    return this.http.post<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 'forgotPassword', 
    forgotPass, { observe: 'response' });
  }

  /**
   * Reset password
   * @param forgotPass 
   */
  resetPassword(resetPass: ResetPassRequest, code: string): Observable<HttpResponse<GeneralResponse>> {
    return this.http.patch<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 
      'resetPassword/' + code , 
      resetPass, { observe: 'response' });
  }

  /**
   * SignUp
   * @param signUpRequest 
   */
  signUp(signUpRequest: SignUpRequest): Observable<HttpResponse<GeneralResponse>> {
    return this.http.post<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 'signup', 
      signUpRequest, { observe: 'response' });
  }

}
