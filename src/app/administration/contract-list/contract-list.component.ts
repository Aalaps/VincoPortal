import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthorisedSideNavService } from '../layout/authorised/services/authorised-side-nav.service';
declare var test: any;
// declare var activeClass: any;

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  toggle = true;
  dash = "Dashboard";

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.dash = this.toggle ? "Dashboard" : "Dashboard";
  }
  f(){
    new test();
  }
  // active(){
  //   //
  //   new activeClass();
  // }
  // active(){
  //   //
  //   new activeClass();
  // }
  public activeProjectIndex!: number;

public activeProject(index: number): void {
  this.activeProjectIndex = index;
}
  public contractData: any = [];
  public latest_date: any = [];
  public company: any = [];
  public supplier: any = [];
  public techtype: any = [];
  public updateContractData: any = [];
  sideBarOpen : any;
  public userName:any;
  public userid = window.localStorage.getItem("contact_id")
  // public id: any;

  page = 1;
  currentIndex = -1;
  title = '';
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];

  constructor(public sideNavService: AuthorisedSideNavService,
              private spinnerService: NgxSpinnerService,
              private _serviceUser: AccountService,
              private router:Router, 
              private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.userName = window.localStorage.getItem("userName");
    this.spinnerService.show();
      this.retrieveContractList(this.userid);
     

  }
  

  retrieveContractList(userid:any):void{
    //
    this._serviceUser.getContractList(userid)
    .subscribe((result: any) => {
      if(result.data.length != 0){
        //
        for (let date of result.data) {
          let Bdates = this.datepipe.transform(date.billingdate, 'MMM d, y');
          let Sdates = this.datepipe.transform(date.signeddate, 'MMM d, y');
          this.latest_date.push(
            {
              billingdate: Bdates,
              signeddate: Sdates,
              managedcontract: date.managedcontract,
              mrc: date.mrc,
              ownerid: date.ownerid,
              name:date.name,
              autorenewal:date.autorenewal,
              stage:date.stage,
              term:date.term,
              id:date.id,
              company:date.company,
              supplier:date.supplier,
              techtype:date.techtype
            });
            this.contractData = this.latest_date;
            
            
        }
        
        let name ;
        for(let i=0;i<this.contractData.length;i++)
        {
         name = this.contractData[i].supplier
         this.supplier.push(name);
        }
        
        let Cname ;
        for(let i=0;i<this.contractData.length;i++)
        {
         Cname = this.contractData[i].company
         this.company.push(Cname);
        }
       
      }
      setTimeout(() => {
        this.spinnerService.hide();
     }, 500);
    }
    );
  }
  handlePageChange(event:any) {
    this.page = event;
    //console.log(event);
    
    this.retrieveContractList(this.userid);
  }
  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveContractList(this.userid);
  }
  
  Logout(){
    sessionStorage.clear();
    localStorage.clear();
  this.router.navigate(["/logins"]);
}
goToUpdatePage(id:any){
  this.router.navigate(["/editContract/" + id])
}
}
