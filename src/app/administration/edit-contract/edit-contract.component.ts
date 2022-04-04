import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AccountService } from 'src/app/Services/account.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import *as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
// import { DOCUMENT } from '@angular/common'; 

declare var test: any;
@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent implements OnInit {

  public opportunityData: any;
  public opportunityData2: any;
  public opportunityDataName: any = [];
  public companyData: any;
  public companyData2: any;
  public companyDataName: any = [];
  public contactData: any;
  public contactData2: any;
  public contactDataName: any = [];
  public contractList: any;
  public contractListId: any = [];
  public updateContractData: any = [];
  public ownerId: any;
  public id: any;
  public stageData : any;
  public stageData2 : any;
  public stageDataName : any=[];
  public documentData : any=[];
  contracts!: FormGroup;
  typeselected!: string;
  getFileName:any;
  userName:any;



  constructor(private datepipe: DatePipe , 
              private spinnerService: NgxSpinnerService,
              private route: ActivatedRoute, 
              private _service: AccountService, 
              private router: Router, 
              private fb: FormBuilder,
              private http: HttpClient
              ) {
    this.typeselected = "ball-fussion"
   }

  ngOnInit(): void {
    this.userName = window.localStorage.getItem("userName");
    this.spinnerService.show();
    this.formInit();
    // this.getAllData();
    this.id = this.route.snapshot.params['id'];
      this.ContractListById(this.id);

  }
  
formInit():void{
  this.contracts = this.fb.group({
    autorenewal:[""],
    company:[""],
    ownerid:[""],
    installdate:[Date],
    billingdate:[Date],
    billingcontact:[""],
    technicalcontact:[""],
    suppliercontact:[""],
    supplier:[""],
    suppliercontract:[""],
    location:[""],
    signatureprocess:[""],
    renewaldate:[Date],
    nrc:[""],
    mrc:[""],
    msa:[""],
    managedcontract:[],
    decisionprocess:[""],
    decisionmakercontract:[""],
    decisiondays:[""],
    industry:[""],
    strategyforcontract:[""],
   //  contractname:[""],
    techcontract:[""],
    techtype:[""],
    term:["" ],
    porequired:[""],
    name:["", Validators.required],
    po:[""],
    stage:[, Validators.required],
    yearlyspend:[""],
    firstrenewalnotificationdate : [Date],
    firstrenewalnotificationdatesent : [""],
    msanoticedates : [Date],
    signeddate : [Date ],
    secondrenewalnotificationdate : [Date ],
    secondrenewalnotificationdatesent : [""],
    thirdrenewalnotificationdate : [Date ],
    thirdrenewalnotificationdatesent : [""],
    finaldecisiondate : [Date ],
    finaldecisiondatesent : [""]
  })
}

  getAllData() {
    const response1 = this._service.getOpportunity();
    const response2 = this._service.getCompany();
    const response3 = this._service.getContact();
    const response6 = this._service.getStage();
    forkJoin([
      response1, response2, response3,response6
    ]).subscribe(([title, addressType, country,stage]) => {
      ////
      this.opportunityData2 = title;
      this.opportunityData = this.opportunityData2.data;
      let obj1;
      for (let i = 0; i < this.opportunityData.length; i++) {
        obj1 = {
          id: this.opportunityData[i].id,
          name: this.opportunityData[i].name
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
      

      
      this.companyData2 = addressType;
      this.companyData = this.companyData2.data;
      let obj2;
      for (let i = 0; i < this.companyData.length; i++) {
        obj2 = {
          id: this.companyData[i].id,
          name: this.companyData[i].name
        }
        this.companyDataName.push(obj2);

      }
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
      this.id = this.route.snapshot.params['id'];
      this.ContractListById(this.id);
    });
    
    
  }

  ContractListById(id: any): void {
    ////
    this.spinnerService.show();
    this._service.getContractListById(id)
      .subscribe((result: any) => {
        setTimeout(()=>{
          this.spinnerService.hide();
        },500)
      // //
    //debugger
      this.updateContractData = result.data;
         this.documentData = this.updateContractData.images;
         this.documentData.forEach((element:any) => {
           //debugger
          //  var find = "http";
	      	// let i = element.notetext.indexOf(find);
           if(element.createdon){
            // var date = element.createdon.toLocaleString().replace('Z', ' ').replace('T', ' ');
            element.createdon = this.datepipe.transform(element.createdon, 'dd/MM/yyyy');
           }
         });
        console.log(this.documentData);

        this.contracts.patchValue(this.updateContractData);
        this.contracts.patchValue({
          billingdate: undefined,
          installdate: undefined,
          renewaldate: undefined,
          msanoticedates: undefined,
          signeddate: undefined,
          firstrenewalnotificationdate: undefined,
          secondrenewalnotificationdate: undefined,
          thirdrenewalnotificationdate: undefined,
          finaldecisiondate: undefined
        });
        let Bdates;  let Idates ;let Rdates ; let Msadates ;  let Sdates ;  let Firstdates;  let Seconddates ;  let Thirddates;  let Finaldates ;
       
        if(this.updateContractData.billingdate){
           Bdates = this.datepipe.transform(this.updateContractData.billingdate, 'MMM d, y');
           this.contracts.patchValue({ 
            billingdate: Bdates
           }); 
        }
        if(this.updateContractData.installdate){
          Idates = this.datepipe.transform(this.updateContractData.installdate, 'MMM d, y');
          this.contracts.patchValue({ 
            installdate: Idates
           }); 
        }
        if(this.updateContractData.renewaldate){
          Rdates = this.datepipe.transform(this.updateContractData.renewaldate, 'MMM d, y');
          this.contracts.patchValue({ 
            renewaldate: Rdates
           }); 
        }
        if(this.updateContractData.msanoticedates){
           Msadates = this.datepipe.transform(this.updateContractData.msanoticedates, 'MMM d, y');
           this.contracts.patchValue({ 
            msanoticedates: Msadates
           }); 
        }
        if(this.updateContractData.signeddate){
          Sdates = this.datepipe.transform(this.updateContractData.signeddate, 'MMM d, y');
          this.contracts.patchValue({ 
            signeddate: Sdates
           }); 
        }
        if(this.updateContractData.firstrenewalnotificationdate){
           Firstdates = this.datepipe.transform(this.updateContractData.firstrenewalnotificationdate, 'MMM d, y');
           this.contracts.patchValue({ 
            firstrenewalnotificationdate: Firstdates
           }); 
        }
        if(this.updateContractData.secondrenewalnotificationdate){
           Seconddates = this.datepipe.transform(this.updateContractData.secondrenewalnotificationdate, 'MMM d, y');
           this.contracts.patchValue({ 
            secondrenewalnotificationdate: Seconddates
           }); 
        }
        if(this.updateContractData.thirdrenewalnotificationdate){
           Thirddates = this.datepipe.transform(this.updateContractData.thirdrenewalnotificationdate, 'MMM d, y');
           this.contracts.patchValue({ 
            thirdrenewalnotificationdate: Thirddates
           }); 
        }
        if(this.updateContractData.finaldecisiondate){
           Finaldates = this.datepipe.transform(this.updateContractData.finaldecisiondate, 'MMM d, y');
           this.contracts.patchValue({ 
            finaldecisiondate: Finaldates
           }); 
        }
       

       

        // let com = this.updateContractData.company;
        // let stg = this.updateContractData.stage;
        // let supplier = this.updateContractData.supplier;
        // let suppliercontact = this.updateContractData.suppliercontact;
        // let billingcontact = this.updateContractData.billingcontact;
        // let techtype = this.updateContractData.techtype;
        // let technicalcontact = this.updateContractData.technicalcontact;
        // let comId;
        // let stgId;
        // let supplierId;
        // let suppliercontactId;
        // let billingcontactId;
        // let techtypeId;
        // let technicalcontactId;
        // let supplierValue;
        // if(com != undefined){
        //   comId = this.companyDataName.findIndex((x: any) => x.id === com.id);
        //   if (comId >= 0) { 
        //     this.contracts.patchValue({ 
        //       company: this.companyDataName[comId].id
        //      }); 
        //     }
        // }
        //
        // if(stg != undefined){
        //   for (let i = 0; i < this.stageDataName.length; i++) {
        //           if(stg === this.stageDataName[i].name){
        //             this.contracts.patchValue({ 
        //               stage: this.stageDataName[i].id
        //              }); 
        //           }
        //   }
        // }
      
        // if(supplier != undefined){
        //   supplierId = this.companyDataName.findIndex((x: any) => x.id === supplier.id);
        //   if (supplierId >= 0) { 
        //     this.contracts.patchValue({ 
        //       supplier: this.companyDataName[supplierId].id,
        //       supplierValue :  this.companyDataName[supplierId].name
        //      }); 
        //     }
        // }
        // if(suppliercontact != undefined){
        //   suppliercontactId = this.contactDataName.findIndex((x: any) => x.id === suppliercontact.id);
        //   if (suppliercontactId >= 0) { 
        //     this.contracts.patchValue({ 
        //       suppliercontact: this.contactDataName[suppliercontactId].id
        //      }); 
        //     }
        // }
        // if(billingcontact != undefined){
        //   billingcontactId = this.contactDataName.findIndex((x: any) => x.id === billingcontact.id);
        //   if (billingcontactId >= 0) { 
        //     this.contracts.patchValue({ 
        //       billingcontact: this.contactDataName[billingcontactId].id
        //      }); 
        //     }
        // }
        // if(techtype != undefined){
        //   techtypeId = this.opportunityDataName.findIndex((x: any) => x.id === techtype.id);
        //   if (techtypeId >= 0) { 
        //     this.contracts.patchValue({ 
        //       techtype: this.opportunityDataName[techtypeId].id
        //      }); 
        //     }
        // }
        // if(technicalcontact != undefined){
        //   technicalcontactId = this.contactDataName.findIndex((x: any) => x.id === technicalcontact.id);
        //   if (technicalcontactId >= 0) { 
        //     this.contracts.patchValue({ 
        //       technicalcontact: this.contactDataName[technicalcontactId].id
        //      }); 
        //     }
        // }
        
     
      });
  }
  
  UpdateContract() {
    //
     this.contracts.value.id = this.updateContractData.id;
     let oid = this.updateContractData.ownerid
     this.contracts.value.ownerid = oid.id;
     console.log(this.contracts.value);
    this._service.postUpdateContract(this.contracts.value).subscribe((res: any) => {
      //
      console.log(res);
      this.router.navigate(["/contractList"]).then(() => {
        window.location.reload();
      });
    });
  }

  Logout(){
    sessionStorage.clear();
    localStorage.clear();
  this.router.navigate(["/logins"]);
  }

downLoadFile(data: any) {
  debugger
  if(data.filename){
    debugger
    let extension = 'application/' + data.filename.substring(data.filename.lastIndexOf('.')+1);
    let blob:any = new Blob([data.notetext], { type: extension });
    const url = window.URL.createObjectURL(blob);
    // window.open(url);
    //window.location.href = response.url;
    FileSaver.saveAs(blob, data.filename);
  }
  else{
    let blob:any = new Blob([data.notetext], { type: 'abc.html' });
    const url = window.URL.createObjectURL(blob);
    // window.open(url);
    //window.location.href = response.url;
    FileSaver.saveAs(blob, 'abc.html');
  }

  // let blob = new Blob([data], { type: extension});
 
//   this._service.downloadFile(data.notetext).subscribe((response:any)=>{
// debugger
//     let blob:any = new Blob([response], { type: extension });
//     const url = window.URL.createObjectURL(blob);
//     // window.open(url);
//     //window.location.href = response.url;
//     FileSaver.saveAs(blob, data.filename);

//   }), (error: any) => console.log('Error downloading the file')

}

f(){
  new test();
}
  
}


