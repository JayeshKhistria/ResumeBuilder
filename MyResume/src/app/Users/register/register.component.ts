import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersModel } from '../models/users-model';
import { RegisterLoginService } from '../services/register-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usersModel: any;
  constructor(private api: RegisterLoginService, private router: Router) {
    this.usersModel = api.usersModel;
    this.usersModel.password = '';
  }

  userPassword:any;
  register(data: NgForm) {

    Swal.fire({
      title: 'Register In Process....',
      // icon:'question',
      iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
      iconColor: '#8EC3B0',
      showConfirmButton: false,
    });

    this.api.usersModel = {};


    this.usersModel = {
      fullname: data.value.fullname,
      username: data.value.username,
      password: data.value.password,
      gender: data.value.gender,
      address: data.value.address,
      mobile: data.value.mobile
    }

    /* This is used for the encryption the password... */
    this.usersModel.password = this.api.encryptPassword(data.value.password);
    this.userPassword = data.value.password;

    // data.reset();
    this.api.userRegister(this.usersModel).subscribe(res => {
      let temp: any = res;
      // console.log(temp);

      if (temp.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: temp.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        // alert(temp.message);
        this.router.navigateByUrl('register');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Register Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('login');
      }
    });
  }



}
