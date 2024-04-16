DECLARE @json NVARCHAR(4000) = '{
  "profilePicture": "",
  "position": "Web Developer",
  "fullname": "Shingadiya Ravi",
  "dateOfBirth": "01/01/2000",
  "gender": "Male",
  "mobile": "9876543210",
  "email": "test@gmail.com",
  "address": "ABC,Visat Circle ,Ahmedabad",
  "languages": "English, Hindi, Gujarati",
  "personalProfile": "I Am A Web Developer With Robust Problem Solving Skills And Proven Experience In Creating And Designing Web In A Test-driven Environment. I am a web developer with robust problem solving skills.",
  "education": {
    "ssc": {
      "sscBoard": "Gujarat Board",
      "sscSchool": "Abc School",
      "sscResult": "78",
      "sscPassingYear": "2016"
    },
    "hsc": {
      "hscBoard": "Gujarat Board",
      "hscSchool": "Xyz School",
      "hscResult": "88",
      "hscPassingYear": "2018"
    },
    "graduation": {
      "gUniversity": "XYZ University",
      "gCollegeName": "ABC College",
      "gStream": "BCA",
      "gResult": "96",
      "gPassingYear": "2021"
    },
    "postGraduation": {
      "pgUniversity": "Darshan University",
      "pgCollegeName": "Darshan College",
      "pgStream": "MCA",
      "pgResult": "94",
      "pgPassingYear": "2023"
    }
  },
  "project": {
    "projectName": "Resume Builder",
    "projectDescription": "I Am A Web Developer With Robust Problem Solving Skills And Proven Experience In Creating And Designing Web In A Test-driven Environment. I am a web developer with robust problem solving skills."
  },
  "professionalSkills": {
    "frontEnd": "HTML, Bootstrap",
    "backEnd": "ASP.Net, PHP",
    "database": "SQL, MYSQL"
  }
}' 

insert into resumes (userID,resume) values(1067,@json)

select json_query(resume,'$.education') as data from resumes where resume_id = 1


select * from resumes where ISJSON(resume) = 1

select * from resumes