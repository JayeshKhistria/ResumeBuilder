import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusService } from 'src/app/login-status.service';
import { AdminModel } from '../Models/admin-model';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {


  constructor(private __http: HttpClient, private router: Router, private status: LoginStatusService) { }

  apiUserUpdate = 'https://localhost:6510/Users/Update';
  apiUserGetAllUsers = 'https://localhost:6510/Users/SelectAll';
  apiUserDelete = 'https://localhost:6510/Users/Delete';

  apiResumeDelete = 'https://localhost:6510/resume/delete';

  apiAdminLogin = 'https://localhost:6510/Admin/Login';
  apiAdminRegister = 'https://localhost:6510/Admin/Insert';
  apiAdminUpdate = 'https://localhost:6510/Admin/Update';



  apiLogin = 'https://localhost:6510/login';
  apiClientList = 'https://localhost:6510/client/list';
  apiClientDelete = 'https://localhost:6510/client/delete';
  apiAdUpdate = 'https://localhost:6510/user/update';

  adminsModel: AdminModel = {
    fullname: '',
    username: 'admin@gmail.com',
    password: '00000000',
    gender: 'Male',
    address: 'Rajkot',
    mobile: '1234',
    status: 1,
    created_at: '',
    updated_at: ''
  };


  userData: any;
  adminData: any;

  getAllUsers() {
    // return this.__http.get(this.apiUserGetAllUsers);
    return this.__http.get(this.apiClientList);
  }

  userDelete(id: any) {
    // return this.__http.post(this.apiUserDelete, id);
    return this.__http.post(this.apiClientDelete, id);
  }

  resumeDelete(id: any) {
    return this.__http.post(this.apiResumeDelete, id);
  }

  userUpdate(data: any) {
    // return this.__http.post(this.apiUserUpdate, data);
    return this.__http.post(this.apiUserUpdate, data);
  }

  adminUpdate(data: any) {
    return this.__http.post(this.apiAdUpdate, data);
  }

  adminRegister(data: any) {
    return this.__http.post(this.apiAdminRegister, data);
  }

  adminLogin(data: any) {
    // return this.__http.post(this.apiAdminLogin, data);
    return this.__http.post(this.apiLogin, data);
  }

  adminLogout() {
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminPassword');
    // localStorage.clear();
    this.status.adminLoginStatus = false;
    // this.status.userLoginStatus = false;

    this.adminData = null;
    this.adminsModel = {};

    this.router.navigateByUrl('login');
  }

  encryptPassword(data: any) {
    return btoa(data);
  }

  decryptPassword(data: any) {
    return atob(data);
  }

}
