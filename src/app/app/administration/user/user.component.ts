import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AccountService } from 'src/app/Services/account.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  contracts!: FormGroup;
  submitted = false;
  public opportunityData: any;
  public opportunityData2: any;
  public opportunityDataName: any = [];
  public companyData: any;
  public companyData2: any;
  public companyDataName: any = [];
  public stageData: any;
  public stageData2: any;
  public stageDataName: any = [];
  public contactData: any;
  public contactData2: any;
  public contactDataName: any = [];
  public contractList: any;
  public contractList2: any;
  public contractListId: any = [];
  public ownerId: any;
  public ownerId2: any;
  public id: any;



  constructor(private spinnerService: NgxSpinnerService, private _service: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.formInit();
    this.getAllData();
  }

  getAllData() {
    const response1 = this._service.getOpportunity();
    const response2 = this._service.getCompany();
    const response3 = this._service.getContact();
    const response6 = this._service.getStage();
    forkJoin([
      response1, response2, response3, response6
    ]).subscribe(([title, addressType, country, stage]) => {
      this.opportunityData2 = title;
      this.opportunityData = this.opportunityData2.data;
      let obj1;
      for (let i = 0; i < this.opportunityData.length; i++) {
        obj1 = {
          id: this.opportunityData[i].id,
          oppname: this.opportunityData[i].name
        }
        this.opportunityDataName.push(obj1);
      }

      this.stageData2 = stage;
      this.stageData = this.stageData2.data;
      let stg;
      for (let i = 0; i < this.stageData.length; i++) {
        stg = {
          id: this.stageData[i].stageId,
          name: this.stageData[i].stagename
        }
        this.stageDataName.push(stg);
      }
      console.log(this.stageDataName);

      this.companyData2 = addressType;
      this.companyData = this.companyData2.data;
      let obj2;
      for (let i = 0; i < this.companyData.length; i++) {
        obj2 = {
          id: this.companyData[i].id,
          comname: this.companyData[i].name
        }
        this.companyDataName.push(obj2);
      }
      console.log(this.companyDataName);

      this.contactData2 = country;
      this.contactData = this.contactData2.data;
      let obj;
      for (let i = 0; i < this.contactData.length; i++) {
        obj = {
          id: this.contactData[i].id,
          fullname: this.contactData[i].fullname
        }
        this.contactDataName.push(obj);
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 500);
    });

  }

  formInit() {
    this.contracts = this.fb.group({
      autorenewal: [""],
      company: [""],
      ownerid: [""],
      installdate: [Date],
      billingdate: [Date],
      billingcontact: [""],
      technicalcontact: [""],
      suppliercontact: [""],
      supplier: [""],
      suppliercontract: [""],
      location: [""],
      renewaldate: [Date],
      nrc: [""],
      mrc: [""],
      msa: [""],
      managedcontract: [],
      decisionprocess: [""],
      decisionmakercontract: [""],
      decisiondays: [""],
      industry: [""],
      strategyforcontract: [""],
      techcontract: [""],
      techtype: [""],
      term: [""],
      porequired: [""],
      name: ["", Validators.required],
      po: [""],
      stage: ["", Validators.required],
      yearlyspend: [""],
      firstrenewalnotificationdate: [Date],
      firstrenewalnotificationdatesent: [""],
      msanoticedates: [Date],
      signeddate: [Date],
      secondrenewalnotificationdate: [Date],
      secondrenewalnotificationdatesent: [""],
      thirdrenewalnotificationdate: [Date],
      thirdrenewalnotificationdatesent: [""],
      finaldecisiondate: [Date],
      finaldecisiondatesent: [""]
    })
  }

  submitContractData() {

    this.contracts.value.ownerid = "8bf82510-1309-ec11-b6e5-0022481f1866";
    console.log(this.contracts.value)
    this._service.postContract(this.contracts.value).subscribe(res => {
      this.router.navigate(["/contractList"]).then(() => {
        window.location.reload();
      });
    })

  }

}


