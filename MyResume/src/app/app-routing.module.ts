import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './Users/about/about.component';
import { ContactComponent } from './Users/contact/contact.component';
import { DashboardComponent } from './Users/dashboard/dashboard.component';
import { HomeComponent } from './Users/home/home.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import { FirstTemplateComponent } from './Users/Templates/first-template/first-template.component';
import { TemplateListComponent } from './Users/Templates/template-list/template-list.component';
import { TestComponent } from './Users/test/test.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // {
  //   path: 'templates', component: TemplateListComponent,
  //   canActivate:[AuthGuard],
  //   // canActivateChild: [AuthGuard],
  //   children: [
  //     { path: 'first-template', component: FirstTemplateComponent, canActivate:[AuthGuard] }
  //   ]
  // },

  { path: 'templates', component: TemplateListComponent, canActivate:[AuthGuard]},
  { path: 'templates/first-template', component: FirstTemplateComponent, canActivate: [AuthGuard]},
  { path: 'user/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },


  { path: 'admin', component: AdminLoginComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },



  { path: 'test', component: TestComponent },
  { path: '**', component: HomeComponent, redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
