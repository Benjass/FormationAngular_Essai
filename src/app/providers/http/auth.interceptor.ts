import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, switchMap } from 'rxjs';
import { LoginService } from '../../pages/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.service.isConnected$.pipe(
      first(),
      switchMap((v) => {
        if (!v) return next.handle(request);
        else
          return this.service.token$.pipe(
            first(),
            switchMap((authorization) =>
              next.handle(
                request.clone({
                  headers: request.headers.set(
                    'authorization', 
                    authorization
                  ),
                })
              )
            )
          );
      })
    );
  }
}
