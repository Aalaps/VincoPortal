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
import { Router } from '@angular/router';


@Injectable()
export default class AppInterceptor implements HttpInterceptor {
  constructor(  private router: Router, ) { }

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
          try {////debugger
            alert(err.error.message);
            this.router.navigate(["/logins"])
          } catch (e) {
            alert(e);
            this.router.navigate(["/logins"])
          }
          // log error
        }
        return of(err);
      }),
    );
  }
}
