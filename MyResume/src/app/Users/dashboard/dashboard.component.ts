import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersModel } from '../models/users-model';
import { RegisterLoginService } from '../services/register-login.service';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  usersModel: any;
  constructor(private __api: RegisterLoginService, private router: Router, private resumeApi: ResumeService) {
    if (!__api.userData) {
      router.navigateByUrl('login');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.clear();
    }
    this.usersModel = __api.usersModel;
  }

  userData: any;
  userForm:any;
  ngOnInit() {
    if ((localStorage.getItem('username') && localStorage.getItem('password'))) {

      // alert(this.__api.userData.UA_ID);
      this.userData = this.__api.userData;

      // this.getResume(this.userData.user_id);
      this.getResume(this.userData.uaid);
    } else {
      this.router.navigateByUrl('login');
    }
  }

  updateUser(data: NgForm) {



    this.usersModel = {
      // user_id:this.userData.user_id,
      uaid: this.userData.uaid,
      fullname: data.value.fullname,
      // password: data.value.password,
      password: this.__api.encryptPassword(data.value.password),
      gender: data.value.gender,
      address: data.value.address,
      mobile: data.value.mobile
    };
    /* This is used for the encrypt the password... */
    // this.usersModel.password = this.__api.encryptPassword(this.usersModel.password);

    // this.__api.userUpdate(this.usersModel).subscribe(result => {
      this.__api.userUpdate(this.usersModel).subscribe(result => {
      let temp: any = result;
      if (temp.status) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Data Not Updated!',
          // footer: '<a href="">Why do I have this issue?</a>'
        });

      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Data Updated!',
          showConfirmButton: false,
          timer: 1500
        });
        // this.usersModel.password = this.__api.decryptPassword(this.usersModel.password);
        this.usersModel.password = this.__api.decryptPassword(this.usersModel.password);
        this.usersModel = result;
      }


    });
  }


  async getResume(data: any) {
    // Swal.fire({
    //   title: 'Resume Data Fetching....',
    //   // icon:'question',
    //   iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
    //   iconColor: '#8EC3B0',
    //   showConfirmButton: false,
    // });
    await this.resumeApi.getResumeData(data).subscribe(res => {
      let temp: any = res;
      if (!temp.status) {
        this.resumeApi.resumeDataStatus = false;
      } else {
        this.resumeApi.resumeDataStatus = true;
        this.resumeApi.resumeData = JSON.parse(temp.resume);
        // console.log(this.resumeApi.resumeData.position );
      }
    });
  }

}
