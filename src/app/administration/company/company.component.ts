import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public companyData : any;
  page = 1;
  currentIndex = -1;
  title = '';
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  constructor(private spinnerService: NgxSpinnerService,private _serviceUser: AccountService) { }

  ngOnInit(): void {
    ////
    this.spinnerService.show();
    this.retrieveCompany()
  }
  retrieveCompany():void{
    this._serviceUser.getCompany()
    .subscribe((result: any) => {
       ////

      this.companyData = result.data
      setTimeout(() => {
        this.spinnerService.hide();
     }, 500);
    }

    );
  }
  handlePageChange(event:any) {
    this.page = event;
    //console.log(event);
    this.retrieveCompany();
  }
  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCompany();
  }
}
