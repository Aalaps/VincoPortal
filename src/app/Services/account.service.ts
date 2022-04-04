import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  ContractData, Login } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

constructor(private http : HttpClient) { }
private _baseURL :string="https://vinco.azurewebsites.net/api/";
private _login :string="auth/login";
private _opportunity :string="opportunity";
private _contact :string="contact";
private _company :string="company";
private _getstageoptions :string="getstageoptions";
private _getContractList :string="contractsbyuserid";
private _ownerId :string="systemuser";
private _contractListById :string="contract";
private _updateContract :string="contract";
private modals: any[] = [];

// private _administrationUrl :string="http://localhost:51234/api/Administration";
private _contractURL :string="https://622af7c514ccb950d22a906f.mockapi.io/api/contracts";

public userId:any='';
public pendingCount:any=0;
parameters:any;
authKey:any;
roleManagers:any;

//#region  administration
  postLogin(login : Login){
    return this.http.post(this._baseURL + this._login,login);
  }
  
  getOpportunity(){
    return this.http.get(this._baseURL + this._opportunity)
  }
  getContact(){
    return this.http.get(this._baseURL + this._contact)
  }
  getCompany(){
    return this.http.get(this._baseURL + this._company)
  }
  getStage(){
    return this.http.get(this._baseURL + this._getstageoptions)
  }
  getContractList(_userid:any){
    return this.http.get(this._baseURL + this._getContractList + "/" + _userid )
  }
  
  getOwnerId(){
    return this.http.get(this._baseURL + this._ownerId)
  }
  getContractListById(_id:any){
    return this.http.get(this._baseURL + this._contractListById + '/' + _id)
  }

  postUpdateContract(data :any){
    //
    const _data ={
      "autorenewal":data.autorenewal,
"billingcontact":data.billingcontact,
"billingdate":data.billingdate,
"company":data.company,
"decisionmakercontract":data.decisionmakercontract,
"decisionprocess":data.decisionprocess,
"signatureprocess":data.signatureprocess,
"installdate":data.installdate,
"location":data.location,
"managedcontract":data.managedcontract,
"mrc":data.mrc,
"msa":data.msa,
"msanoticedates":data.msanoticedates,
"name":data.name,
"nrc":data.nrc,
"ownerid":data.ownerid,
"po":data.po,
"porequired":data.porequired,
"renewaldate":data.renewaldate,
"signeddate":data.signeddate,
"stage":data.stage,
"supplier":data.supplier,
"suppliercontact":data.suppliercontact,
"suppliercontract":data.suppliercontract,
"techcontract":data.techcontract,
"technicalcontact":data.technicalcontact,
"techtype":data.techtype,
"term":data.term,
"yearlyspend":data.yearlyspend,
"firstrenewalnotificationdate":data.firstrenewalnotificationdate,
"firstrenewalnotificationdatesent":data.firstrenewalnotificationdatesent,
"secondrenewalnotificationdate":data.secondrenewalnotificationdate,
"secondrenewalnotificationdatesent":data.secondrenewalnotificationdatesent,
"thirdrenewalnotificationdate":data.thirdrenewalnotificationdate,
"thirdrenewalnotificationdatesent":data.thirdrenewalnotificationdatesent,
"decisiondays":data.decisiondays,
"finaldecisiondate":data.finaldecisiondate,
"finaldecisiondatesent":data.finaldecisiondatesent,
"industry":data.industry,
"strategyforcontract":data.strategyforcontract,
"id":data.id
  }

  console.log(data);
    return this.http.post(this._baseURL + this._updateContract  , _data);
  }



  getContractData(){
    return this.http.get(this._contractURL);
  }
  
  postContract(data : any){
    ////
    //
    const _data ={
      "autorenewal":data.autorenewal,
"billingcontact":data.billingcontact,
"billingdate":data.billingdate,
"company":data.company,
"decisionmakercontract":data.decisionmakercontract,
"decisionprocess":data.decisionprocess,
"installdate":data.installdate,
"location":data.location,
"managedcontract":data.managedcontract,
"mrc":data.mrc,
"msa":data.msa,
"msanoticedates":data.msanoticedates,
"name":data.name,
"nrc":data.nrc,
"ownerid":data.ownerid,
"po":data.po,
"porequired":data.porequired,
"renewaldate":data.renewaldate,
"signatureprocess":data.signatureprocess,
"signeddate":data.signeddate,
"stage":data.stage,
"supplier":data.supplier,
"suppliercontact":data.suppliercontact,
"suppliercontract":data.suppliercontract,
"techcontract":data.techcontract,
"technicalcontact":data.technicalcontact,
"techtype":data.techtype,
"term":data.term,
"yearlyspend":data.yearlyspend,
"firstrenewalnotificationdate":data.firstrenewalnotificationdate,
"firstrenewalnotificationdatesent":data.firstrenewalnotificationdatesent,
"secondrenewalnotificationdate":data.secondrenewalnotificationdate,
"secondrenewalnotificationdatesent":data.secondrenewalnotificationdatesent,
"thirdrenewalnotificationdate":data.thirdrenewalnotificationdate,
"thirdrenewalnotificationdatesent":data.thirdrenewalnotificationdatesent,
"decisiondays":data.decisiondays,
"finaldecisiondate":data.finaldecisiondate,
"finaldecisiondatesent":data.finaldecisiondatesent,
"industry":data.industry,
"strategyforcontract":data.strategyforcontract
  }
    return this.http.post(this._baseURL + this._updateContract , _data);
  } 

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.open();
}

}


