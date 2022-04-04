import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {

  constructor() { }
  gettoken(){  
    ////
    return !!localStorage.getItem("jwtToken");  
    }
}
