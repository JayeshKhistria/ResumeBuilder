import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,of } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginStatusService } from '../login-status.service';
import { ResumeService } from '../Users/services/resume.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private status: LoginStatusService, private router: Router,private resumeAPi:ResumeService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.status.adminLoginStatus || this.status.userLoginStatus) {
      return true;
    } else {

     Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login!',
        // footer: '<a href="">Why do I have this issue?</a>'
      });

      // alert("You need to login...");

      localStorage.removeItem("username");
      localStorage.removeItem("password");

      localStorage.removeItem("adminUsername");
      localStorage.removeItem("adminPassword");

      localStorage.clear();

      this.router.navigateByUrl("/login");

      return false;
    }

    // return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.status.adminLoginStatus || this.status.userLoginStatus) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login!',
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      // alert("You need to login...");
      this.router.navigateByUrl("/login");

      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("adminUsername");
      localStorage.removeItem("adminPassword");
      localStorage.clear();
      return false;
    }

    // canActivateChild

  }

}
