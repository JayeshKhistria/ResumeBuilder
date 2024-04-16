import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginStatusService } from 'src/app/login-status.service';
import { RegisterLoginService as userService } from '../services/register-login.service';
import { RegisterLoginService as adminService } from 'src/app/Admin/Services/register-login.service';
import { stat } from 'fs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, public _userApi: userService, public status: LoginStatusService, public _adminApi: adminService) {

  }

  ngDoCheck() {

  }



  userLogout() {
    this._userApi.userLogout();
    this.status.userLoginStatus = false;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logout Successfully!',
      showConfirmButton: false,
      timer: 1500
    });
    // this.status.adminLoginStatus = false;
  }

  adminLogout() {
    this._adminApi.adminLogout();
    this.status.adminLoginStatus = false;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logout Successfully!',
      showConfirmButton: false,
      timer: 1500
    });
    // this.status.userLoginStatus = false;
  }

}
