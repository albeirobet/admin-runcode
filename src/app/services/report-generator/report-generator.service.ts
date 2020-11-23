import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { ReportGeneratorConstants } from 'src/app/utils/constants/report-generator.constants';
import { FilterRequest } from 'src/app/model/commons/request/filter-request';

type EntityResponseType = HttpResponse<GeneralResponse>;
type EntityArrayResponseType = HttpResponse<GeneralResponse>;

@Injectable({ providedIn: 'root' })
export class ReportGeneratorService {

  constructor(protected http: HttpClient) { }

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

  uploadEntryMerchandiseExtra(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandiseExtra/load',
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

  uploadPaymentExtra(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentExtra/load',
      formData);
  }

  uploadIva(file: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'iva/load',
      formData);
  }

  counter(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'counter');
  }

  deleteClients(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'clients/delete',
      { observe: 'response' });
  }

  countClients(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'clients/count');
  }

  deleteSuppliers(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'suppliers/delete',
      { observe: 'response' });
  }

  countSuppliers(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'suppliers/count');
  }

  deleteServices(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'services/delete',
      { observe: 'response' });
  }
  countServices(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'services/count');
  }

  deleteMaterials(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'materials/delete',
      { observe: 'response' });
  }
  countMaterials(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'materials/count');
  }

  deletePurchaseOrders(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'purchaseOrders/delete',
      { observe: 'response' });
  }
  countPurchaseOrders(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'purchaseOrders/count');
  }

  deleteEntryMerchandises(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandises/delete',
      { observe: 'response' });
  }
  countEntryMerchandises(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandises/count');
  }

  deleteEntryMerchandiseExtra(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandiseExtra/delete',
      { observe: 'response' });
  }
  countEntryMerchandiseExtra(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandiseExtra/count');
  }

  deleteInvoiceSupplier(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceSupplier/delete',
      { observe: 'response' });
  }
  countInvoiceSupplier(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceSupplier/count');
  }

  deleteRetentionSupplier(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'retentionSupplier/delete',
      { observe: 'response' });
  }
  countRetentionSupplier(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'retentionSupplier/count');
  }

  deleteInvoiceClient(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceClient/delete',
      { observe: 'response' });
  }
  countInvoiceClient(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceClient/count');
  }

  deleteMasterReport(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'masterReport/delete',
      { observe: 'response' });
  }
  countMasterReport(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'masterReport/count');
  }

  deleteAssistantReport(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'assistantReport/delete',
      { observe: 'response' });
  }
  countAssistantReport(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'assistantReport/count');
  }

  deletePaymentOriginal(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentOriginal/delete',
      { observe: 'response' });
  }
  countPaymentOriginal(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentOriginal/count');
  }

  deletePaymentExtra(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentExtra/delete',
      { observe: 'response' });
  }
  countPaymentExtra(): Observable<GeneralResponse> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentExtra/count');
  }

  deleteIva(): Observable<HttpResponse<{}>> {
    return this.http.delete(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'iva/delete',
      { observe: 'response' });
  }

  getAssistantReport(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'assistantReport/all' + params,
      { observe: 'response' });
  }

  getClients(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'clients/all' + params,
      { observe: 'response' });
  }

  getEntryMerchandisesExtra(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandiseExtra/all' + params,
      { observe: 'response' });
  }

  getEntryMerchandises(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'entryMerchandises/all' + params,
      { observe: 'response' });
  }

  getSuppliers(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'suppliers/all' + params,
      { observe: 'response' });
  }

  getServices(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'services/all' + params,
      { observe: 'response' });
  }

  getMaterials(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'materials/all' + params,
      { observe: 'response' });
  }

  getPaymentOriginal(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentOriginal/all' + params,
      { observe: 'response' });
  }

  getPaymentExtra(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'paymentExtra/all' + params,
      { observe: 'response' });
  }
  
  getPurchaseOrders(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'purchaseOrders/all' + params,
      { observe: 'response' });
  }

  getInvoiceSupplier(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceSupplier/all' + params,
      { observe: 'response' });
  }

  getIvaReport(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'iva/all' + params,
      { observe: 'response' });
  }

  getRetentionSupplier(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'retentionSupplier/all' + params,
      { observe: 'response' });
  }

  getInvoiceClient(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'invoiceClient/all' + params,
      { observe: 'response' });
  }

  getMasterReport(params): Observable<any> {
    return this.http.get<any>(
      ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL + 'masterReport/all' + params,
      { observe: 'response' });
  }

}
