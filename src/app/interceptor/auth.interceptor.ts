import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../service/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _spinner: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // spinner start
    this._spinner.setSpinnerStetus(true);

    const modifieReq = request.clone({
      setHeaders: {
        Auth: `JWT Token form LS(INTERCEPTOR)`,
      },
    });
    return next.handle(modifieReq).pipe(
      finalize(() => {
        ///api call res is getting >>..stop spinner
        this._spinner.setSpinnerStetus(false);
      }),
    );
  }
}
