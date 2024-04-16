import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResumeModel } from '../models/resume-model';
import { RegisterLoginService } from './register-login.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private __http: HttpClient, private api: RegisterLoginService) { }

  apiResumeDataUrl = "https://localhost:6510/resumeData";
  apiResumeInsertUrl = "https://localhost:6510/resume/insert";
  apiResumeUpdateUrl = "https://localhost:6510/resume/update";
  resumeData:any;
  resumeDataStatus:boolean = false;

  resume = {
    profilePicture: '',
    position: '',
    fullname: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    languages: '',
    personalProfile: '',
    education: {
      ssc: { sscBoard: '', sscSchool: '', sscResult: '', sscPassingYear: '' },
      hsc: { hscBoard: '', hscSchool: '', hscResult: '', hscPassingYear: '' },
      graduation: { gResult: '', gStream: '', gPassingYear: '', gCollegeName: '', gUniversityName: '' },
      postGraduation: { pgResult: '', pgStream: '', pgPassingYear: '', pgCollegeName: '', pgUniversityName: '' }
    },
    project: { projectName: '', projectDescription: '' },
    professionalSkills: { frontEnd: '', backEnd: '', database: '' },
  };

  resumeModel: ResumeModel = {
    userId: '',
    resume: this.resume,
  }

  // ngOnInit() {
  //   this.resumeModel = {
  //     userId: this.api.userData.user_id,
  //     resume: this.resume,
  //   }
  // }


  getResumeData(data: any) {
    return this.__http.post(this.apiResumeDataUrl, data);
  }

  insertResume(data: any) {
    return this.__http.post(this.apiResumeInsertUrl, data);
  }

  updateResume(data:any){
    return this.__http.post(this.apiResumeUpdateUrl, data);
  }
}
