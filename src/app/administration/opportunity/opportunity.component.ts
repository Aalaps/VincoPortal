import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {
public opportunityData : any;
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
    this.retrieveOpportunity()
  }
  
  retrieveOpportunity(): void{
    // const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this._serviceUser.getOpportunity()
      .subscribe((result: any) => {
         ////
          this.opportunityData = result.data;
          this.count = result.data.length;
          setTimeout(() => {
            this.spinnerService.hide();
         }, 500);
      }
     
      );
  }
  handlePageChange(event:any) {
    this.page = event;
    //console.log(event);
    this.retrieveOpportunity();
  }
  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveOpportunity();
  }
 
}


