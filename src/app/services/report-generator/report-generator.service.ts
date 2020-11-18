import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { ReportGeneratorConstants } from 'src/app/utils/constants/report-generator.constants';

type EntityResponseType = HttpResponse<GeneralResponse>;
type EntityArrayResponseType = HttpResponse<GeneralResponse>;

@Injectable({ providedIn: 'root' })
export class ReportGeneratorService {

  constructor(protected http: HttpClient) {}

  uploadClients(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'clients/load', 
      formData);
  }

  uploadSuppliers(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'suppliers/load', 
      formData);
  }

  uploadServices(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'services/load', 
      formData);
  }

  uploadMaterials(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'materials/load', 
      formData);
  }

  uploadPurchaseOrders(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'purchaseOrders/load', 
      formData);
  }

  uploadEntryMerchandises(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandises/load', 
      formData);
  }

  uploadInvoiceSupplier(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceSupplier/load', 
      formData);
  }

  uploadRetentionSupplier(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'retentionSupplier/load', 
      formData);
  }

  uploadInvoiceClient(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceClient/load', 
      formData);
  }

  uploadMasterReport(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'masterReport/load', 
      formData);
  }

  uploadAssistantReport(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'assistantReport/load', 
      formData);
  }

  uploadPaymentOriginal(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentOriginal/load', 
      formData);
  }

  deleteClients(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'clients/delete', 
      { observe: 'response' });
  }

  countClients(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'clients/count');
  }

  countSuppliers(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'suppliers/count');
  }

  countServices(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'services/count');
  }

  countMaterials(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'materials/count');
  }

  countPurchaseOrders(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'purchaseOrders/count');
  }

  countEntryMerchandises(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandises/count');
  }

  countInvoiceSupplier(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceSupplier/count');
  }

  countRetentionSupplier(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'retentionSupplier/count');
  }

  countInvoiceClient(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceClient/count');
  }

  countMasterReport(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'masterReport/count');
  }

  countAssistantReport(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'assistantReport/count');
  }

  countPaymentOriginal(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentOriginal/count');
  }

}
