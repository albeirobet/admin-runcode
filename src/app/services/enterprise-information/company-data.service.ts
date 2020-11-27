import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessControlConstants } from 'src/app/utils/constants/access-control.constants';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { EnterpriseInformationConstants } from 'src/app/utils/constants/enterprise-information.constants';
import { ICompany } from 'src/app/model/enterprise-information/company';

type EntityResponseType = HttpResponse<GeneralResponse>;
type EntityArrayResponseType = HttpResponse<GeneralResponse>;

@Injectable({ providedIn: 'root' })
export class CompanyDataService {

  constructor(protected http: HttpClient) {}

  create(company: ICompany): Observable<GeneralResponse> {
    delete company._id;
    return this.http.post<GeneralResponse>(EnterpriseInformationConstants.ENTERPRISE_INFO_ENDPOINT_URL_COMPANY_DATA + 'create', 
      company);
  }

  update(company: ICompany): Observable<EntityResponseType> {
    return this.http.patch<GeneralResponse>(EnterpriseInformationConstants.ENTERPRISE_INFO_ENDPOINT_URL_COMPANY_DATA + 'update', 
    company, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<GeneralResponse>(`${AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS}/${id}`, 
    { observe: 'response' });
  }

  query(req?: any, search?: string): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<GeneralResponse>(EnterpriseInformationConstants.ENTERPRISE_INFO_ENDPOINT_URL_COMPANY_DATA +
       'getAllCompanies', 
      { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${AccessControlConstants.ACCESS_CONTROL_ENDPOINT_URL_USERS}deleteUser/${id}`, 
    { observe: 'response' });
  }

}
