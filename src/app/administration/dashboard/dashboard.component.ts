import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var test: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userName:any;
  constructor(private router:Router, ) { }

  ngOnInit(): void {
    this.userName = window.localStorage.getItem("userName");
  }
  f(){
    new test();
  }
  Logout(){
    sessionStorage.clear();
    localStorage.clear();
  this.router.navigate(["/logins"]);
}
}
