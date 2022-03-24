import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdministrationComponent } from './administration.component';
import { ContractListComponent } from './contract-list/contract-list.component';
// import AuthGuard from '../Infrastructure/auth-guard';
import { AuthenticateGuard } from '../authenticate.guard';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { ContactComponent } from './contact/contact.component';
import { CompanyComponent } from './company/company.component';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AuthGuardService as AuthGuard } from '../Infrastructure/auth-guard.service';

const routes: Routes = [{ path: '', component: AdministrationComponent,children :[
  {path: 'contracts' , component: UserComponent,canActivate: [AuthenticateGuard] },
  {path: 'contractList' , component: ContractListComponent,canActivate: [AuthenticateGuard] },
  {path: 'opportunity' , component: OpportunityComponent,canActivate: [AuthenticateGuard] },
  {path: 'contact' , component: ContactComponent,canActivate: [AuthenticateGuard] },
  {path: 'company' , component: CompanyComponent,canActivate: [AuthenticateGuard] },
  {path: 'editContract/:id' , component: EditContractComponent,canActivate: [AuthenticateGuard] },
  {path: 'dashboard' , component: DashboardComponent,canActivate: [AuthenticateGuard] },
  {path: 'AccessDeniedPage' , component: AccessDeniedComponent }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthenticateGuard]
})
export class AdministrationRoutingModule { }
