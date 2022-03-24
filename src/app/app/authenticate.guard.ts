import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateServiceService } from './authenticate-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  /**
   *
   */
  constructor(private router: Router,private authenticateService: AuthenticateServiceService) {
  }
  canActivate():boolean{
    ////
    
    if (!this.authenticateService.gettoken()) {
      

      this.router.navigateByUrl("/logins");  
  }  

 
  return this.authenticateService.gettoken();
  }
    
  }
  

