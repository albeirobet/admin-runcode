import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuth } from 'src/app/model/access-control/auth';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { AccessControlConstants } from 'src/app/utils/constants/access-control.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * Servicio de LOGIN
   * @param auth credenciales del usuario
   */
  login(credentials: IAuth): Observable<void> {
    return this.http
      .post<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 'login', credentials)
      .pipe(map(response => this.authenticateSuccess(response, true)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('acc_tok_rc');
      sessionStorage.removeItem('acc_tok_rc');
    });
  }

  /**
   * Almacena los datos del usuario logueado
   * @param response  respuesta del servicio LOGIN
   * @param rememberMe true para guardar en localstorage, false en sessionstorage
   */
  authenticateSuccess(response: GeneralResponse, rememberMe: boolean): void {
    const jwt = response.data.token;
    if (rememberMe) {
      localStorage.setItem('acc_tok_rc', jwt);
    } else {
      sessionStorage.setItem('acc_tok_rc', jwt);
    }
  }


  
}
