import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { Login } from '../../Models/models';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginmsg:any=null;
  loginModel = new Login("","","","");

  constructor(private router : Router,
              private _service:AccountService,
              private spinnerService: NgxSpinnerService) { }

  submitLogin(){
    this.spinnerService.show();
   this._service.postLogin(this.loginModel).subscribe((res : any) => {
   if(res.data.contact_id != null){
    window.localStorage.setItem("contact_id",res.data.contact_id );
    window.localStorage.setItem("jwtToken", res.data.token);
    window.localStorage.setItem("userName", res.data.firstname);
    window.localStorage.setItem("email", res.data.email);
    window.localStorage.setItem("fullName", res.data.firstname + " " + res.data.lastname);

          this.router.navigate(["/contractList"]);
      
          this.loginmsg="Login Successfully";
    }

else if(res.status != 200){
  this.loginmsg="Invalid Login Attempt";
}
else if(res.status == 200){
  this.loginmsg="password' must not be empty";
}
     
    })
        
    
  }


  ngOnInit(): void {
}

}
