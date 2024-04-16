import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  constructor() { }

  CryptoJS = require("crypto-js");

  userLoginStatus:boolean = false;

  adminLoginStatus:boolean = false;
}
