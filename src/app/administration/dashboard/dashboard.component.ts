import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { ModelService } from '../model/model.service';
declare var test: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userName:any;
  constructor(private router:Router,private modalService: ModelService,private service: AccountService ) { }

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
openModal(id: string) :void{
  this.service.open(id);
}

closeModal(id: string) {
  this.modalService.close(id);
}

}
