import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormRecord } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ResumeService } from '../../services/resume.service';
import { RegisterLoginService } from '../../services/register-login.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-first-template',
  templateUrl: './first-template.component.html',
  styleUrls: ['./first-template.component.css']
})

export class FirstTemplateComponent {

  selectedPhoto: any = [];
  resumeModel: any;
  constructor(private sanitizer: DomSanitizer, public resumeApi: ResumeService, private userApi: RegisterLoginService, private router: Router, private route: ActivatedRoute) {
    this.resumeModel = resumeApi.resumeModel;


    // this.resumeModel.userId = userApi.userData.user_id;
    this.resumeModel.userId = userApi.userData.uaid;

    // this.resumeModel.userId = userApi.userData.uaid;
  }

  userInputs: any;
  result: any;
  async ngOnInit() {

    this.resumeModel = this.resumeApi.resumeModel;

    if (!this.resumeApi.resumeDataStatus) {
      Swal.fire({
        position: 'top-end',
        // icon: 'success',
        title: 'Welcome, Build Your Resume!',
        showConfirmButton: false,
        timer: 1500
      });
      this.userInputs = new FormGroup({
        // profilePicture: new FormControl('', [Validators.required]),
        profilePicture: new FormControl(this.selectedPhoto[0], [Validators.required]),
        position: new FormControl('Web Developer', [Validators.required]),
        fullname: new FormControl('Shingadiya Ravi', [Validators.required]),
        dateOfBirth: new FormControl('2023-03-16', [Validators.required]),
        gender: new FormControl('Male', [Validators.required]),
        mobile: new FormControl('9876543210', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
        email: new FormControl('test@gmail.com', [Validators.required, Validators.email]),
        address: new FormControl('ABC,Visat Circle ,Ahmedabad', [Validators.required]),
        languages: new FormControl('English, Hindi, Gujarati', [(Validators.required)]),
        personalProfile: new FormControl('I Am A Web Developer With Robust Problem Solving Skills And Proven Experience In Creating And Designing Web In A Test-driven Environment. I am a web developer with robust problem solving skills.', [Validators.required, Validators.maxLength(200)]),
        education: new FormGroup({
          ssc: new FormGroup({
            sscBoard: new FormControl('Gujarat Board', [(Validators.required)]),
            sscSchool: new FormControl('Abc School', [(Validators.required)]),
            sscResult: new FormControl('78', [(Validators.required, Validators.pattern("\d[0-9]"), Validators.min(10)), Validators.max(100)]),
            sscPassingYear: new FormControl('2016', [(Validators.required,
              Validators.pattern(/^\d{4}$/))]),
          }),

          hsc: new FormGroup({
            hscBoard: new FormControl('Gujarat Board', [(Validators.required)]),
            hscSchool: new FormControl('Xyz School', [(Validators.required)]),
            hscResult: new FormControl('88', [(Validators.required, Validators.min(1)), Validators.max(100)]),
            hscPassingYear: new FormControl('2018', [(Validators.required,
              Validators.pattern(/^\d{4}$/))]),
          }),

          graduation: new FormGroup({
            gUniversityName: new FormControl('XYZ University', [(Validators.required)]),
            gCollegeName: new FormControl('ABC College', [(Validators.required)]),
            gStream: new FormControl('BCA', [(Validators.required)]),
            gResult: new FormControl('96', [(Validators.required, Validators.min(1)), Validators.max(100)]),
            gPassingYear: new FormControl('2021', [(Validators.required, Validators.pattern(/^\d{4}$/))])
          }),

          postGraduation: new FormGroup({
            pgUniversityName: new FormControl('Darshan University', [(Validators.required)]),
            pgCollegeName: new FormControl('Darshan College', [(Validators.required)]),
            pgStream: new FormControl('MCA', [(Validators.required)]),
            pgResult: new FormControl('94', [(Validators.required, Validators.min(1)), Validators.max(100)]),
            pgPassingYear: new FormControl('2023', [(Validators.required, Validators.pattern(/^\d{4}$/))])
          }),

        }),
        project: new FormGroup({
          projectName: new FormControl('Resume Builder', [(Validators.required)]),
          projectDescription: new FormControl('I have a developed some project in college and that project build with frotEnd : html, css, javascript, backend:php and database: mysql server and my project is simple and usefully...', [(Validators.required, Validators.maxLength(200))]),
        }),
        professionalSkills: new FormGroup({
          frontEnd: new FormControl('HTML, Bootstrap', [(Validators.required)]),
          backEnd: new FormControl('ASP.Net, PHP', [(Validators.required)]),
          database: new FormControl('SQL, MYSQL', [(Validators.required)])
        }),

      });
    } else {
      Swal.fire({
        position: 'top-end',
        // icon: 'success',
        title: 'Welcome, Update Your Resume!',
        showConfirmButton: false,
        timer: 1500
      });
      this.selectedPhoto[0] = this.resumeApi.resumeData.profilePicture;
      this.userInputs = new FormGroup({
        profilePicture: new FormControl(this.selectedPhoto[0], [Validators.required]),
        position: new FormControl(this.resumeApi.resumeData.position, [Validators.required]),
        fullname: new FormControl(this.resumeApi.resumeData.fullname, [Validators.required]),
        dateOfBirth: new FormControl(this.resumeApi.resumeData.dateOfBirth, [Validators.required]),
        gender: new FormControl(this.resumeApi.resumeData.gender, [Validators.required]),
        mobile: new FormControl(this.resumeApi.resumeData.mobile, [Validators.required, Validators.pattern(/^\d{10}$/)]),
        email: new FormControl(this.resumeApi.resumeData.email, [Validators.required, Validators.email]),
        address: new FormControl(this.resumeApi.resumeData.address, [Validators.required]),
        languages: new FormControl(this.resumeApi.resumeData.languages, [(Validators.required)]),
        personalProfile: new FormControl(this.resumeApi.resumeData.personalProfile, [Validators.required, Validators.maxLength(200)]),
        education: new FormGroup({
          ssc: new FormGroup({
            sscBoard: new FormControl(this.resumeApi.resumeData.education.ssc.sscBoard, [(Validators.required)]),
            sscSchool: new FormControl(this.resumeApi.resumeData.education.ssc.sscSchool, [(Validators.required)]),
            sscResult: new FormControl(this.resumeApi.resumeData.education.ssc.sscResult, [(Validators.required, Validators.pattern("\d[0-9]"), Validators.min(10)), Validators.max(100)]),
            sscPassingYear: new FormControl(this.resumeApi.resumeData.education.ssc.sscPassingYear, [(Validators.required,
              Validators.pattern(/^\d{4}$/))]),
          }),

          hsc: new FormGroup({
            hscBoard: new FormControl(this.resumeApi.resumeData.education.hsc.hscBoard, [(Validators.required)]),
            hscSchool: new FormControl(this.resumeApi.resumeData.education.hsc.hscSchool, [(Validators.required)]),
            hscResult: new FormControl(this.resumeApi.resumeData.education.hsc.hscResult, [(Validators.required, Validators.min(1)), Validators.max(100)]),
            hscPassingYear: new FormControl(this.resumeApi.resumeData.education.hsc.hscPassingYear, [(Validators.required,
              Validators.pattern(/^\d{4}$/))]),
          }),

          graduation: new FormGroup({
            gUniversityName: new FormControl(this.resumeApi.resumeData.education.graduation.gUniversity, [(Validators.required)]),
            gCollegeName: new FormControl(this.resumeApi.resumeData.education.graduation.gCollegeName, [(Validators.required)]),
            gStream: new FormControl(this.resumeApi.resumeData.education.graduation.gStream, [(Validators.required)]),
            gResult: new FormControl(this.resumeApi.resumeData.education.graduation.gResult, [(Validators.required, Validators.min(1)), Validators.max(100)]),
            gPassingYear: new FormControl(this.resumeApi.resumeData.education.graduation.gPassingYear, [(Validators.required, Validators.pattern(/^\d{4}$/))])
          }),

          postGraduation: new FormGroup({
            pgUniversityName: new FormControl(this.resumeApi.resumeData.education.postGraduation.pgUniversity, [(Validators.required)]),
            pgCollegeName: new FormControl(this.resumeApi.resumeData.education.postGraduation.pgCollegeName, [(Validators.required)]),
            pgStream: new FormControl(this.resumeApi.resumeData.education.postGraduation.pgStream, [(Validators.required)]),
            pgResult: new FormControl(this.resumeApi.resumeData.education.postGraduation.pgResult, [(Validators.required, Validators.min(1)), Validators.max(100)]),
            pgPassingYear: new FormControl(this.resumeApi.resumeData.education.postGraduation.pgPassingYear, [(Validators.required, Validators.pattern(/^\d{4}$/))])
          }),

        }),
        project: new FormGroup({
          projectName: new FormControl(this.resumeApi.resumeData.project.projectName, [(Validators.required)]),
          projectDescription: new FormControl(this.resumeApi.resumeData.project.projectDescription, [(Validators.required, Validators.maxLength(200))]),
        }),
        professionalSkills: new FormGroup({
          frontEnd: new FormControl(this.resumeApi.resumeData.professionalSkills.frontEnd, [(Validators.required)]),
          backEnd: new FormControl(this.resumeApi.resumeData.professionalSkills.backEnd, [(Validators.required)]),
          database: new FormControl(this.resumeApi.resumeData.professionalSkills.database, [(Validators.required)])
        }),

      });
    }


  }



  ngDoCheck() {
    // this.ngOnInit();
    this.resumeModel.resume = {
      // profilePicture: this.userInputs.value.profilePicture,
      profilePicture: this.selectedPhoto[0],
      position: this.userInputs.value.position,
      fullname: this.userInputs.value.fullname,
      dateOfBirth: this.userInputs.value.dateOfBirth,
      gender: this.userInputs.value.gender,
      mobile: this.userInputs.value.mobile,
      email: this.userInputs.value.email,
      address: this.userInputs.value.address,
      languages: this.userInputs.value.languages,
      personalProfile: this.userInputs.value.personalProfile,
      education: {
        ssc: {
          sscBoard: this.userInputs.value.education?.ssc?.sscBoard,
          sscSchool: this.userInputs.value.education?.ssc?.sscSchool,
          sscResult: this.userInputs.value.education?.ssc?.sscResult,
          sscPassingYear: this.userInputs.value.education?.ssc?.sscPassingYear
        },
        hsc: {
          hscBoard: this.userInputs.value.education?.hsc?.hscBoard,
          hscSchool: this.userInputs.value.education?.hsc?.hscSchool,
          hscResult: this.userInputs.value.education?.hsc?.hscResult,
          hscPassingYear: this.userInputs.value.education?.hsc?.hscPassingYear
        },
        graduation: {
          gUniversity: this.userInputs.value.education?.graduation?.gUniversityName,
          gCollegeName: this.userInputs.value.education?.graduation?.gCollegeName,
          gStream: this.userInputs.value.education?.graduation?.gStream,
          gResult: this.userInputs.value.education?.graduation?.gResult,
          gPassingYear: this.userInputs.value.education?.graduation?.gPassingYear,
        },
        postGraduation: {
          pgUniversity: this.userInputs.value.education?.postGraduation?.pgUniversityName,
          pgCollegeName: this.userInputs.value.education?.postGraduation?.pgCollegeName,
          pgStream: this.userInputs.value.education?.postGraduation?.pgStream,
          pgResult: this.userInputs.value.education?.postGraduation?.pgResult,
          pgPassingYear: this.userInputs.value.education?.postGraduation?.pgPassingYear,
        }
      },
      project: {
        projectName: this.userInputs.value.project?.projectName,
        projectDescription: this.userInputs.value.project?.projectDescription
      },
      professionalSkills: {
        frontEnd: this.userInputs.value.professionalSkills?.frontEnd,
        backEnd: this.userInputs.value.professionalSkills?.backEnd,
        database: this.userInputs.value.professionalSkills?.database
      },
    };

    // console.log("Profile :",this.resumeModel.resume.profilePicture[0]);
    // console.log("Profile :",this.selectedPhoto[0]);
  }




  buildResume() {
    if (this.resumeApi.resumeDataStatus) {
      Swal.fire({
        title: 'Resume Under The Updating....',
        // icon:'question',
        iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
        iconColor: '#8EC3B0',
        showConfirmButton: false,
      });

      this.update();
    } else {
      Swal.fire({
        title: 'Resume under the building...',
        // icon: 'question',
        iconHtml: '<img src="../../assets/Common/preLoader.gif" class="card border-0" />',
        iconColor: '#8EC3B0',
        showConfirmButton: false,
      });
      this.create();
    }
  }

  create() {
    this.resumeApi.insertResume(this.resumeModel).subscribe(res => {
      let temp: any = res;
      if (temp.status) {
        // console.log(res);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: temp.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        // alert(temp.message);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Resume Build Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.resumeApi.resumeData = temp.resume;
        this.resumeApi.resumeDataStatus = true;
        // this.resumeModel.resume = temp.resume;
        // console.log(res);
      }
    });
  }

  update() {
    this.resumeApi.updateResume(this.resumeModel).subscribe(res => {
      let temp: any = res;
      if (temp.status) {
        // console.log(res);
        // alert(temp.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: temp.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else {
        // console.log(res);
        // this.resumeApi.resumeData = temp;
        this.resumeApi.resumeData = temp.resume;
        this.resumeApi.resumeDataStatus = true;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Resume Updated Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        // alert(this.resumeApi.resumeData.education.graduation.gUniversity);
        // console.log(this.resumeApi.resumeData.resume.education.graduation.gUniversityName);
      }
    });
  }

  //#region Get Set Form Values...
  get profilePicture() {
    return this.userInputs.get('profilePicture');
  }

  get position() {
    return this.userInputs.get('position');
  }

  get fullname() {
    return this.userInputs.get('fullname');
  }

  get gender() {
    return this.userInputs.get('gender');
  }

  get dateOfBirth() {
    return this.userInputs.get("dateOfBirth");
  }

  get mobile() {
    return this.userInputs.get('mobile');
  }

  get email() {
    return this.userInputs.get('email');
  }

  get address() {
    return this.userInputs.get('address');
  }

  get languages() {
    return this.userInputs.get('languages');
  }

  get personalProfile() {
    return this.userInputs.get('personalProfile');
  }

  get sscBoard() {
    return this.userInputs.get('education.ssc.sscBoard');
  }

  get sscSchool() {
    return this.userInputs.get('education.ssc.sscSchool');
  }

  get sscResult() {
    return this.userInputs.get('education.ssc.sscResult');
  }

  get sscPassingYear() {
    return this.userInputs.get('education.ssc.sscPassingYear');
  }

  get hscBoard() {
    return this.userInputs.get('education.hsc.hscBoard');
  }

  get hscSchool() {
    return this.userInputs.get('education.hsc.hscSchool');
  }

  get hscResult() {
    return this.userInputs.get('education.hsc.hscResult');
  }

  get hscPassingYear() {
    return this.userInputs.get('education.hsc.hscPassingYear');
  }

  get gUniversityName() {
    return this.userInputs.get('education.graduation.gUniversityName');
  }

  get gCollegeName() {
    return this.userInputs.get('education.graduation.gCollegeName');
  }

  get gStream() {
    return this.userInputs.get('education.graduation.gStream');
  }

  get gResult() {
    return this.userInputs.get('education.graduation.gResult');
  }

  get gPassingYear() {
    return this.userInputs.get('education.graduation.gPassingYear');
  }

  get pgUniversityName() {
    return this.userInputs.get('education.postGraduation.pgUniversityName');
  }

  get pgCollegeName() {
    return this.userInputs.get('education.postGraduation.pgCollegeName');
  }

  get pgStream() {
    return this.userInputs.get('education.postGraduation.pgStream');
  }

  get pgResult() {
    return this.userInputs.get('education.postGraduation.pgResult');
  }

  get pgPassingYear() {
    return this.userInputs.get('education.postGraduation.pgPassingYear');
  }

  get projectName() {
    return this.userInputs.get('project.projectName');
  }

  get projectDescription() {
    return this.userInputs.get('project.projectDescription');
  }

  get psFrontEnd() {
    return this.userInputs.get('professionalSkills.forntEnd');
  }

  get psBackEnd() {
    return this.userInputs.get('professionalSkills.backEnd');
  }

  get psDatabase() {
    return this.userInputs.get('professionalSkills.database');
  }

  //#endregion


  /*
    This code write by varun sir...
    Ref : https://stackblitz.com/edit/angular-blob-file-download-svhf1v?file=app%2Fapp.component.html
  */
  //#region Profile Show
  photoUpload(event: any) {
    if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      this.changeFile(file).then((base64: any) => {
        // console.log(base64);
        this.selectedPhoto = this.b64Blob([base64], type);
        // console.log(this.selectedPhoto)
      });
    } else alert('Nothing')
  }

  changeFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  b64Blob(blob: any, fileName: string): File {
    let b: any = blob;
    // b.lastModified = moment.now();
    // b.lastModifiedDate = new Date();
    // b.name = fileName;
    // b.webkitRelativePath = '';

    // console.log(blob[0]);
    // this.userInputs.profilePicture = blob[0];
    this.selectedPhoto = blob[0];
    // this.resumeModel.resume.profilePicture = blob[0];

    console.log(this.selectedPhoto);
    return <File>blob;
  }
  //#endregion

}
