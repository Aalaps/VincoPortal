import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export default class AppInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     //////
    const token = localStorage.getItem("jwtToken");
    let cloned = request;
    if (token) {
        //////
      cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
        .append("token",token)
      });
    }
    
    return next.handle(cloned).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
            alert(evt.body.success.message);
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            alert(err.error.message);
          } catch (e) {
            alert('An error occurred');
          }
          // log error
        }
        return of(err);
      }),
    );
  }
}
