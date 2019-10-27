import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
      }, error => {
        if (error.status === 401 || error.status === 403) {
          this.authenticationService.reAuthOnError(error);
        }
        // if (error.message !== 'Cannot connect to Error Logging Service' &&
        //   !error.message.includes('/web-app-svc/log/error') &&
        //   !error.message.includes('/web-app-svc/log/errorx')) {
        //   this.errorHandlerService.handleError(error);
        // }
      })
    );
  }
}
