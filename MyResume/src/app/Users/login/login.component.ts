import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { time } from 'console';
import { timer } from 'rxjs';
import { LoginStatusService } from 'src/app/login-status.service';
import Swal from 'sweetalert2';
import { UsersModel } from '../models/users-model';
import { RegisterLoginService } from '../services/register-login.service';
import { RegisterLoginService as registerLoginAdminService } from '../../Admin/Services/register-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usersModel: any;
  userPassword: any;

  constructor(private __api: RegisterLoginService,private registerLoginAdminService:registerLoginAdminService, private router: Router, private status: LoginStatusService) {
    this.usersModel = __api.usersModel;
    this.userPassword = this.usersModel.password;
  }

  // usersModel = {
  //   username: 'ravi@gmail.com',
  //   password: '00000000',
  // };


  login(data: NgForm) {
    this.usersModel.username = data.value.username;
    /* This is used for Decryp the password ... */
    this.usersModel.password = this.__api.encryptPassword(data.value.password);


    // This is used for don't display the error when password encrypted......
    this.userPassword = data.value.password;

    this.checkLogin();
  }

  checkLogin() {

    Swal.fire({
      title: 'Loading...',
      // icon:'question',
      iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
      // iconColor:'#8EC3B0',
      showConfirmButton: false,
      // timer:500,
    });

    this.__api.userLogin(this.usersModel).subscribe(result => {

      let temp: any = result;

      if (temp.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: temp.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        // alert(temp.message);
        this.router.navigateByUrl('login');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          iconColor: '#8EC3B0',
          // width:250,
          customClass: 'custom-swal',

          title: 'Login Successfully!',
          showConfirmButton: false,
          timer: 1500
        });


        

        this.usersModel = temp;
        this.usersModel.password = this.__api.decryptPassword(this.usersModel.password);
        this.__api.userData = this.usersModel;

        if(temp.status){
          localStorage.setItem('adminUsername', temp.username);
          localStorage.setItem('adminPassword', temp.password);
          this.registerLoginAdminService.adminData = temp
          this.status.adminLoginStatus = true;
          this.status.userLoginStatus = false;
          
          this.router.navigateByUrl('admin/dashboard');
        }else{
          localStorage.setItem('username', temp.username);
          localStorage.setItem('password', temp.password);
          this.status.userLoginStatus = true;
          this.status.adminLoginStatus = false;

          this.router.navigateByUrl('user/dashboard');
        }


        // console.log(this.__api.userData);




        // localStorage.setItem('username', temp.username);
        // localStorage.setItem('password', temp.password);

        // this.usersModel = temp;
        // this.usersModel.password = this.__api.decryptPassword(this.usersModel.password);

        // this.status.userLoginStatus = true;

        // this.__api.userData = this.usersModel;

        // // console.log(this.__api.userData);
        // this.router.navigateByUrl('user/dashboard');
      }
    });

  }


}
