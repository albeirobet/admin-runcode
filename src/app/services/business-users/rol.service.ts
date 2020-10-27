import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/access-control/user';
import { AccessControlConstants } from 'src/app/utils/constants/access-control.constants';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { IRol } from 'src/app/model/access-control/rol';

type EntityResponseType = HttpResponse<GeneralResponse>;
type EntityArrayResponseType = HttpResponse<GeneralResponse>;

@Injectable({ providedIn: 'root' })
export class RolService {

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_ROLES + 'getAllRol', 
      { params: options, observe: 'response' });
  }

}
