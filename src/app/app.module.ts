import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { AdministrationModule } from './administration/administration.module';
import { DatePipe } from '@angular/common';
import { AccountService } from './Services/account.service';
// import AuthGuard from './Infrastructure/auth-guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthenticateGuard } from './authenticate.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AccountModule,
    ReactiveFormsModule,
    AdministrationModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [DatePipe,AuthenticateGuard,AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

