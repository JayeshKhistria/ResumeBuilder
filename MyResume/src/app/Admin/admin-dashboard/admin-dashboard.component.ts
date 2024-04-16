import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeService } from 'src/app/Users/services/resume.service';
import Swal from 'sweetalert2';
import { AdminModel } from '../Models/admin-model';
import { RegisterLoginService } from '../Services/register-login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminModel: any;
  constructor(public __api: RegisterLoginService, private router: Router) {
    if (!__api.adminData) {
      router.navigateByUrl('login');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminPassword');
      localStorage.clear();
    }
    this.adminModel = __api.adminsModel
  }

  adminData: any;
  userData: any;

  // adminModel: AdminModel = {
  //   fullname: '',
  //   username: '',
  //   password: '',
  //   gender: '',
  //   address: '',
  //   mobile: ''
  // };

  ngOnInit() {
    if ((localStorage.getItem('adminUsername') && localStorage.getItem('adminPassword'))) {
      this.adminData = this.__api.adminData;
      this.userData = this.__api.userData;
      this.getData();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  updateUser(data: NgForm) {

    Swal.fire({
      title: 'Data Under The Updating....',
      // icon:'question',
      iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
      iconColor: '#8EC3B0',
      showConfirmButton: false,
    });

    this.adminModel = {
      uaid: this.adminData.uaid,
      fullname: data.value.fullname,
      password: data.value.password,
      gender: data.value.gender,
      address: data.value.address,
      mobile: data.value.mobile,
    };

    /* This is used for the encryption the password... */
    this.adminModel.password = this.__api.encryptPassword(this.adminModel.password);


    this.__api.adminUpdate(this.adminModel).subscribe(result => {
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
        this.adminModel = temp;
      }


    });
  }


  async delete(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: 'Data Under The Updating....',
          // icon:'question',
          iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
          iconColor: '#8EC3B0',
          showConfirmButton: false,
        });

        this.__api.userDelete(id).subscribe(result => {
          // alert("Data Deleted...");
          let temp: any = result;


          if (temp.status == true) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: temp.message,
            });
            this.getData();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: temp.message,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
            // alert(temp.message)
          }
        });
      } else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Client not deleted!',
        //   // footer: '<a href="">Why do I have this issue?</a>'
        // });
      }
    });

    // if (confirm("Are your sure to delete !")) {
    //   this.__api.userDelete(id).subscribe(result => {
    //     // alert("Data Deleted...");
    //     let temp: any = result;


    //     if (temp.status == true) {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Data Deleted!',
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    //       this.getData();
    //     }else{
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: temp.message,
    //         // footer: '<a href="">Why do I have this issue?</a>'
    //       });
    //       // alert(temp.message)
    //     }
    //   });

    // } else {
    //   // alert("No");
    // }
  }

  resumeDelete(id: any) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: 'Data Under The Deleting....',
          // icon:'question',
          iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
          iconColor: '#8EC3B0',
          showConfirmButton: false,
        });

        this.__api.resumeDelete(id).subscribe(result => {
          let temp: any = result;

          if (temp.status) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: temp.message,
              timer:2000,
            });
            // alert(temp.message);
            this.getData();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: temp.message,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
            // alert(temp.message);
          }
        });
      }
      else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Client Resume not deleted!',
        //   // footer: '<a href="">Why do I have this issue?</a>'
        // });
      }
    });





    // if (confirm("Are your sure to delete !")) {
    //   this.__api.resumeDelete(id).subscribe(result => {
    //     let temp: any = result;

    //     if (temp.status) {
    //       alert(temp.message);
    //       this.getData();
    //     } else {
    //       alert(temp.message);
    //     }
    //   });
    // } else {
    //   alert("Resume Not Deleted...");
    // }

  }

  async getData() {

    await this.__api.getAllUsers().subscribe(result => {
      let temp: any = result;

      if (temp.message) {
        // alert("Userlist is Empty");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Client list empty!',
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigateByUrl('admin/dashboard');
        this.__api.userData = null;
      } else {
        this.__api.userData = temp;

        for (let i = 0; i < temp.length; i++) {
          // console.log(temp[i].password);
          this.__api.userData[i].password = this.__api.decryptPassword(temp[i].password);
        }


        // this.__api.userData.password = this.__api.decryptPassword(temp.password);
      }
    });
  }

}
