import { Component } from '@angular/core';
import { LoginStatusService } from './login-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyResume';

  constructor(private status:LoginStatusService){}

  // ngDoCheck(){
  //   window.onload = () =>{
  //     localStorage.removeItem("username");
  //     localStorage.removeItem("password");
  //     localStorage.removeItem("adminUsername");
  //     localStorage.removeItem("adminPassword");
  //     localStorage.clear();

  //     this.status.adminLoginStatus = false;
  //     this.status.userLoginStatus = false;
  //   }
  // }


}
