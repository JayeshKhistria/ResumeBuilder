import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Users/home/home.component';
import { ContactComponent } from './Users/contact/contact.component';
import { AboutComponent } from './Users/about/about.component';
import { FirstTemplateComponent } from './Users/Templates/first-template/first-template.component';
import { HeaderComponent } from './Users/header/header.component';
import { FooterComponent } from './Users/footer/footer.component';
import { TemplateListComponent } from './Users/Templates/template-list/template-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import { DashboardComponent } from './Users/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterLoginService } from './Users/services/register-login.service';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { TestComponent } from './Users/test/test.component';


import { NgxPrintModule } from 'ngx-print';
// import swal from 'sweetalert';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    FirstTemplateComponent,
    HeaderComponent,
    FooterComponent,
    TemplateListComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPrintModule,
  ],
  providers: [RegisterLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
