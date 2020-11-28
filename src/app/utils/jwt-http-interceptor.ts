import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from './constants/app-constants';
import { ReportGeneratorConstants } from './constants/report-generator.constants';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('acc_tok_rc');
        let clone: HttpRequest<any>;
        if (request.url === AppConstants.URL_IP_ADDRESS) {
            clone = request.clone({
                setHeaders: {
                }
            });
            return next.handle(clone);
        }

        if (request.url.includes(ReportGeneratorConstants.REPORT_GENERATOR_ENDPOINT_URL)) {
            clone = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(clone);
        }

        if (token) {
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`
                }
            });
        }
        return next.handle(clone);
    }
}
