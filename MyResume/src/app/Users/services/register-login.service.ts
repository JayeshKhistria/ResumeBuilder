import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginStatusService } from 'src/app/login-status.service';
import { UsersModel } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  CryptoJS:any;

  usersModel:UsersModel = {
    // user_id : 0,
    uaid:0,
    fullname : '',
    username : 'admin@gmail.com',
    password : '00000000',
    gender : 'Male',
    address : 'Rajkot',
    mobile : '1234'
  };

  constructor(private __http: HttpClient, private router: Router, private status:LoginStatusService) {
    this.CryptoJS = require('crypto-js');
  }

  apiRegister = 'https://localhost:6510/Users/Insert';
  apiUpdate = 'https://localhost:6510/Users/Update';
  apiLogin = 'https://localhost:6510/Users/Login';
  apiGetAllUsers = 'https://localhost:6510/Users/SelectAll';

  apiInsert = 'https://localhost:6510/client/insert';
  apiClientUpdate = 'https://localhost:6510/user/update';
  apiClientLogin = 'https://localhost:6510/login';

  userData: any;
  loginStatus: boolean = false;

  getAllUsers() {
    return this.__http.get(this.apiGetAllUsers);
  }

  userRegister(data: any) {
    // return this.__http.post(this.apiRegister, data);
    return this.__http.post(this.apiInsert, data);
  }

  userUpdate(data: any) {
    // return this.__http.post(this.apiUpdate, data);
    return this.__http.post(this.apiClientUpdate,data);
  }

  userLogin(data: any) {
    // return this.__http.post(this.apiLogin, data);
    return this.__http.post(this.apiClientLogin, data);
  }

  userLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    // localStorage.clear();
    this.status.userLoginStatus = false;

    this.userData = null;
    this.usersModel = {};

    this.router.navigateByUrl('login');
  }


  encryptPassword(data:any){
    return btoa(data);
  }

  decryptPassword(data:any){
    return atob(data);
  }

}
