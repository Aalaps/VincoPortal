import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var test: any;

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})



export class AdministrationComponent implements OnInit {
  f(event:any){
    // //debugger
    new test(event);
  }
  items: any;
  public pendingCount:any;
  public roleManagers:any=[];
  public roleName:any;
  public userName:any;
  public fullName:any;
  public email:any;
  public userId:any;
  public i:any;
  public roleBoolean:boolean | undefined;
  constructor(private router:Router) {}
  ngOnInit(){
   this.userName = window.localStorage.getItem("userName");
   this.fullName = window.localStorage.getItem("fullName");
   this.email = window.localStorage.getItem("email");
   
  }

  Logout(){
      sessionStorage.clear();
      localStorage.clear();
    this.router.navigate(["/logins"]);
  }


}
