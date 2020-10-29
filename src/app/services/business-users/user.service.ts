import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/access-control/user';
import { AccessControlConstants } from 'src/app/utils/constants/access-control.constants';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { UpdatePassRequest } from 'src/app/model/access-control/update-pass-request';

type EntityResponseType = HttpResponse<GeneralResponse>;
type EntityArrayResponseType = HttpResponse<GeneralResponse>;

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(protected http: HttpClient) {}

  create(user: IUser): Observable<EntityResponseType> {
    return this.http.post<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 'createUser', 
      user, { observe: 'response' });
  }

  update(user: IUser): Observable<EntityResponseType> {
    return this.http.patch<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 'updateUser', 
      user, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<GeneralResponse>(`${AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS}/${id}`, 
    { observe: 'response' });
  }

  query(req?: any, search?: string): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS +
       'getAllUsersTable', 
      { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS}deleteUser/${id}`, 
    { observe: 'response' });
  }

  /**
   * Actualizar password
   * @param updatePass 
   */
  updatePassword(updatePass: UpdatePassRequest): Observable<HttpResponse<GeneralResponse>> {
    return this.http.patch<GeneralResponse>(AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS + 'updatePassword', 
    updatePass, { observe: 'response' });
  }
}
