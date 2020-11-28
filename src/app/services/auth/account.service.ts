import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccessControlConstants } from '../../utils/constants/access-control.constants';
import { IAccount } from 'src/app/model/access-control/account';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { NotificationService } from '../common/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userIdentity: IAccount | null = null;
  private accountCache$?: Observable<GeneralResponse | null>;

  constructor(private http: HttpClient,
    private router: Router, 
    private authService: AuthService,
    private notificationService: NotificationService,
    public jwtHelper: JwtHelperService) { }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<GeneralResponse | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError((error) => {
          console.log(error)
          this.notificationService.error(error.error.apiError.messageUser);
          this.authService.logout();
          this.authenticate(null);
          return of(null);
        }),
        tap((account: GeneralResponse | null) => {

          if (account) {
            this.authenticate(account.data);
          } else {
            this.authenticate(null);
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  authenticate(identity: IAccount | null): void {
    this.userIdentity = identity;
    if(!identity)
      this.accountCache$ = null;

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('acc_tok_rc');
    if (token == null) {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  private fetch(): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(
      AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 'account');
  }

  private navigateToStoredUrl(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
