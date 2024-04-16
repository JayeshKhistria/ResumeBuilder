using Microsoft.AspNetCore.Mvc;
using MyResume_API.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using Response = MyResume_API.Models.Response;

namespace MyResume_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumesController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public ResumesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpPost]
        [Route("/resumeData")]
        public IActionResult getResumeData([FromBody] int id)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Resumes_selectByUserId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@userId", id);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                Resumes resumeObj = new Resumes();
                while (reader.Read())
                {
                    resumeObj.resume_id = Convert.ToInt32(reader["resume_id"]);
                    resumeObj.userId = Convert.ToInt32(reader["userID"]);
                    //resumeObj.resume = Convert.ToString(reader["resume"]);
                    resumeObj.resume = reader["resume"];
                    resumeObj.status = Convert.ToInt32(reader["status"]);
                    resumeObj.created_at = Convert.ToString(reader["created_at"]);
                    resumeObj.updated_at = Convert.ToString(reader["updated_at"]);
                }
                return Ok(resumeObj);
            }
            else
            {
                con.Close();
                Response res = new Response();
                res.message = "Resume Is Not Created Yet...";
                res.status = false; ;
                return Ok(res);
            }
        }



        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("/resume/insert")]
        public IActionResult insert([FromBody] Resumes resume)
        {
            Response res = new Response();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Resumes_Insert", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@userID", resume.userId);
            //cmd.Parameters.AddWithValue("@resume", resume.resume);
            cmd.Parameters.AddWithValue("@resume", Convert.ToString(resume.resume));

            con.Open();
            int i;
            try
            {
                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return Ok(resume);
                }
            }
            catch (Exception e)
            {
                res.message = "You Already Have A One Resume So You Can't Create Second Resume..." + e;
                res.status = false;
                return Ok(res);
            }
            if (i > 0)
            {
                res.message = "Data Inserted...";
                res.status = true;
                return Ok(resume);
            }
            else
            {
                res.message = "Data Not Inserted...";
                res.status = false;
                return Ok(res);
            }

        }




        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("/resume/update")]
        public IActionResult update([FromBody] Resumes resume)
        {
            Response res = new Response();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Resumes_Update", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@userID", resume.userId);
            //cmd.Parameters.AddWithValue("@resume", resume.resume);
            cmd.Parameters.AddWithValue("@resume", Convert.ToString(resume.resume));

            con.Open();
            int i;
            try
            {

                //if (fileModel.file != null && fileModel.file.Length > 0)
                //{
                //    //This is used for the unique name for the filename....
                //    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(Convert.ToString(fileModel.file.FileName));

                //    //string path = Path.Combine("/Uploads/Images", fileModel.FileName);
                //    //string path = Path.Combine(_configuration.GetSection("UploadFileStrings").GetSection("UploadFilePath").Value, fileModel.FileName);
                //    string path = Path.Combine(_configuration.GetSection("UploadFilePath").Value, fileName);

                //    using (Stream stream = new FileStream(path, FileMode.Create))
                //    {
                //        fileModel.file.CopyToAsync(stream);
                //    }
                //    //return Ok(fileName);
                //    //resume.profilePicture = fileName;
                //}
                //res.status = true;
                //res.message = "Images Created Successfully...";

                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return Ok(resume);
                }


            }
            catch (Exception e)
            {
                res.message = "You Already Have A One Resume So You Can't Create Second Resume..." + e;
                res.status = false;
                return Ok(res);
            }
            if (i > 0)
            {
                res.message = "Data Updated...";
                res.status = true;
                return Ok(resume);
            }
            else
            {
                res.message = "Data Not Updated...";
                res.status = false;
                return Ok(res);
            }

        }


        [HttpPost]
        [Route("/resume/delete")]
        public IActionResult delete([FromBody] int id)
        {
            Response res = new Response();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("connection"));
            SqlCommand cmd = new SqlCommand("PR_Resumes_DeleteByUserId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@userId", id);
            con.Open();
            int i;
            try
            {
                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    res.message = "Resume Deleted...";
                    res.status = true;
                    return Ok(res);
                }
            }
            catch (Exception ex)
            {
                res.message = "Resume Not Deleted..." + ex.Message;
                res.status = false;
                return Ok(res);
            }

            res.message = "Resume Not Found On This UserID...";
            res.status = false;
            return Ok(res);
        }



        //[HttpPost]
        //[DisableRequestSizeLimit]
        //[Route("/resume/UploadFile")]
        //public IActionResult UploadFile([FromForm] FileModel fileModel)
        //{
        //    Response response = new Response();

        //    try
        //    {
        //        if (fileModel.file != null && fileModel.file.Length > 0)
        //        {
        //            //This is used for the unique name for the filename....
        //            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(Convert.ToString(fileModel.file.FileName));

        //            //string path = Path.Combine("/Uploads/Images", fileModel.FileName);
        //            //string path = Path.Combine(_configuration.GetSection("UploadFileStrings").GetSection("UploadFilePath").Value, fileModel.FileName);
        //            string path = Path.Combine(_configuration.GetSection("UploadFilePath").Value, fileName);

        //            using (Stream stream = new FileStream(path, FileMode.Create))
        //            {
        //                fileModel.file.CopyToAsync(stream);
        //            }
        //        }
        //        response.status = true;
        //        response.message = "Images Created Successfully...";

        //    }
        //    catch (Exception ex)
        //    {
        //        response.status = false;
        //        response.message = "Some Error Occured : " + ex.Message;
        //    }

        //    return Ok(response);
        //}


    }

}
