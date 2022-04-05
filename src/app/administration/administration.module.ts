import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';

import { UserComponent } from './user/user.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import AppInterceptor from '../Infrastructure/app.interceptor';
// import AuthGuard from '../Infrastructure/auth-guard';
import { AuthenticateGuard } from '../authenticate.guard';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { ContactComponent } from './contact/contact.component';
import { CompanyComponent } from './company/company.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { AuthorisedPageContentComponent } from './layout/authorised/authorised-page-content/authorised-page-content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModelService } from './model/model.service';
import { ModalComponent } from './model/model.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    UserComponent,
    AccessDeniedComponent,
    ContractListComponent,
    OpportunityComponent,
    ContactComponent,
    CompanyComponent,
    EditContractComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    AuthorisedSideNavComponent,
    AuthorisedPageContentComponent,
    DashboardComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }, AuthenticateGuard,ModelService]
})


export class AdministrationModule {

}
