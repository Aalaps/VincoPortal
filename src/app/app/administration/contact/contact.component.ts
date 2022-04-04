import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contactData : any;
  // public child : any;
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
    this.retrieveContact()
  }
  retrieveContact(): void{
    this._serviceUser.getContact()
    .subscribe((result: any) => {
      this.contactData = result.data
      setTimeout(() => {
        this.spinnerService.hide();
     }, 500);
    }

    );
  }
  handlePageChange(event:any) {
    this.page = event;
    this.retrieveContact();
  }
  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveContact();
  }

}
