import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    // RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class AccountModule { }
