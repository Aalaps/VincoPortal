import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { Login } from '../../Models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginmsg:any=null;
  loginModel = new Login("","","","");

  constructor(private router : Router,private _service:AccountService) { }

  submitLogin(){
    ////
    //
   this._service.postLogin(this.loginModel).subscribe((res : any) => {
     //
     //
      //console.log(res.loginmsg);"3a541f80-a10c-ec11-b6e5-000d3a8fbb18"

   if(res.data.contact_id != null){
     ////
    window.localStorage.setItem("contact_id",res.data.contact_id );
    window.localStorage.setItem("jwtToken", res.data.token);
    window.localStorage.setItem("userName", res.data.firstname);

          this.router.navigate(["/contractList"]);
      
          this.loginmsg="Login Successfully";
    }

else if(res.status != 200){
  ////////
  this.loginmsg="Invalid Login Attempt";
}
else if(res.status == 200){
  ////////
  this.loginmsg="password' must not be empty";
}
     
    })
        
    
  }


  ngOnInit(): void {
}

}
