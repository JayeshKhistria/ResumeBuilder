import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ResumeService } from '../services/resume.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  CryptoJS: any;

  constructor(private api: ResumeService, private http: HttpClient) {
    this.CryptoJS = require("crypto-js");
  }

  // name:any = 'Ravi';


  // encryptData(){
  //   this.name = this.CryptoJS.AES.encrypt(this.name,'username').toString();
  // }

  // decryptData(){
  //   this.name = this.CryptoJS.AES.decrypt(this.name,'username').toString(this.CryptoJS.enc.Utf8);
  // }

  data: any;
  resumeData: any;

  // getData(){
  //   return this.api.getResumeData(2069).subscribe(res=>{
  //     // let temp:any = res;
  //     this.data = res;
  //     // this.data = JSON.parse(temp);

  //     this.resumeData = JSON.parse(this.data.resume);
  //     // this.resumeData = JSON.parse(this.data);
  //   });
  // }



  uploadImage(data: any) {
    return this.http.post("https://localhost:6510/UploadFile", data).subscribe(res => {
      let temp = res;
      alert(temp);
    });
  }

  // getImage(data: any) {
  //   // let headers = new HttpHeaders();
  //   // headers = headers.set('content-type', 'Application/json');
  //   // return this.http.get(`https://localhost:6510/getImage?imageName=${data}` ).subscribe(res => {
  //   return this.http.post('https://localhost:6510/getImage', data).subscribe(res => {
  //     let temp: any = res;
  //     this.data = JSON.parse(temp.data);
  //     console.log(this.data);
  //     // alert(temp.fileContents);
  //   });
  // }


}
