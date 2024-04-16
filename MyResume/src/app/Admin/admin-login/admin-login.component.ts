import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginStatusService } from 'src/app/login-status.service';
import Swal from 'sweetalert2';
import { AdminModel } from '../Models/admin-model';
import { RegisterLoginService } from '../Services/register-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  adminModel: any;
  adminPassword: any;
  constructor(private __api: RegisterLoginService, private router: Router, private status: LoginStatusService) {
    this.adminModel = __api.adminsModel;
    this.adminPassword = this.adminModel.password;
  }



  login(data: NgForm) {
    this.adminModel.username = data.value.username;
    /* This is used for Decryp the password ... */
    this.adminModel.password = this.__api.encryptPassword(data.value.password);


    // This is used for only error not show when password is encrypted...
    this.adminPassword = data.value.password;

    this.checkLogin();
  }

  async checkLogin() {
    this.__api.adminLogin(this.adminModel).subscribe(result => {

      let temp: any = result;

      if (temp.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: temp.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        // alert(temp.message);
        this.router.navigateByUrl('admin/login');
      } else {
        if(temp.status){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem('adminUsername', temp.username);
          localStorage.setItem('adminPassword', temp.password);

          this.adminModel = temp;
          this.adminModel.password = this.__api.decryptPassword(this.adminModel.password);

          // this.__api.loginStatus = true;

          this.status.adminLoginStatus = true;
          this.__api.adminData = this.adminModel;

          this.router.navigateByUrl('admin/dashboard');
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You don't have an admin access !",
            // footer: '<a href="">Why do I have this issue?</a>'
          });
          // alert("You don't have an admin access !");
          this.router.navigateByUrl("admin/login");
        }

      }
    });

    // this.__api.getAllUsers().subscribe(res => {
    //   this.__api.userData = res;
    // });
  }


}
