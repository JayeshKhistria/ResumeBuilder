using Microsoft.AspNetCore.Mvc;
using MyResume_API.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace MyResume_API.Controllers
{
    public class AdminController : Controller
    {
        public readonly IConfiguration _configuration;
        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("Admin/SelectAll")]
        public IActionResult getAdminList()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Admins_SelectAll", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            List<Admins> AdminsList = new List<Admins>();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Admins adminObj = new Admins();
                    adminObj.admin_id = Convert.ToInt32(reader["admin_id"]);
                    adminObj.fullname = Convert.ToString(reader["fullname"]);
                    adminObj.username = Convert.ToString(reader["username"]);
                    adminObj.password = Convert.ToString(reader["password"]);
                    adminObj.gender = Convert.ToString(reader["gender"]);
                    adminObj.address = Convert.ToString(reader["address"]);
                    adminObj.mobile = Convert.ToString(reader["mobile"]);
                    adminObj.status = Convert.ToInt32(reader["status"]);
                    adminObj.created_at = Convert.ToString(reader["created_at"]);
                    adminObj.updated_at = Convert.ToString(reader["updated_at"]);
                    AdminsList.Add(adminObj);
                }
                con.Close();
                return Ok(AdminsList);
            }
            else
            {
                con.Close();
                Response res = new Response();
                res.message = "Data NOt Found";
                return Ok(res);
            }

        }


        [HttpPost]
        [Route("Admin/SelectById")]
        public IActionResult getSingleAdmin([FromBody] int id)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Admins_SelectById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@admin_id", id);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                Admins adminObj = new Admins();
                while (reader.Read())
                {

                    adminObj.admin_id = Convert.ToInt32(reader["admin_id"]);
                    adminObj.fullname = Convert.ToString(reader["fullname"]);
                    adminObj.username = Convert.ToString(reader["username"]);
                    adminObj.password = Convert.ToString(reader["password"]);
                    adminObj.gender = Convert.ToString(reader["gender"]);
                    adminObj.address = Convert.ToString(reader["address"]);
                    adminObj.mobile = Convert.ToString(reader["mobile"]);
                    adminObj.status = Convert.ToInt32(reader["status"]);
                    adminObj.created_at = Convert.ToString(reader["created_at"]);
                    adminObj.updated_at = Convert.ToString(reader["updated_at"]);
                }
                return Ok(adminObj);

            }
            else
            {
                con.Close();
                Response res = new Response();
                res.message = "Data Not Found";
                return Ok(res);
            }

        }


        [HttpPost]
        [Route("Admin/Insert")]
        public IActionResult insert([FromBody] Admins admin)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Admins_Insert", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@fullname", admin.fullname);
            cmd.Parameters.AddWithValue("@username", admin.username);
            cmd.Parameters.AddWithValue("@password", admin.password);
            cmd.Parameters.AddWithValue("@gender", admin.gender);
            cmd.Parameters.AddWithValue("@address", admin.address);
            cmd.Parameters.AddWithValue("@mobile", admin.mobile);
            con.Open();
            int i = 0;
            try
            {
                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return Ok(admin);
                }
            }
            catch (Exception e)
            {
                Response res = new Response();
                //res.message = "Data Not Inserted... Because of : " + e.Message;
                res.message = "Username Already Exists... Try To Another Username";
                return Ok(res);

            }
            //int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i > 0)
            {
                Response res = new Response();
                res.message = "Data Inserted";
                return Ok(res);
            }
            else
            {
                Response res = new Response();
                res.message = "Data Not Inserted";
                return Ok(res);
            }

        }


        [HttpPost]
        [Route("Admin/Update")]
        public IActionResult update([FromBody] Admins admin)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("connection"));
            SqlCommand cmd = new SqlCommand("PR_Admins_UpdateById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("admin_id", admin.admin_id);
            cmd.Parameters.AddWithValue("fullname", admin.fullname);
            cmd.Parameters.AddWithValue("password", admin.password);
            cmd.Parameters.AddWithValue("gender", admin.gender);
            cmd.Parameters.AddWithValue("address", admin.address);
            cmd.Parameters.AddWithValue("mobile", admin.mobile);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i > 0)
            {
                return Ok(admin);
            }
            else
            {
                Response res = new Response();
                res.message = "Data Not Updated";
                return Ok(res);
            }
        }


        [HttpPost]
        [Route("Admin/Delete")]
        public IActionResult delete([FromBody] int id)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("connection"));
            SqlCommand cmd = new SqlCommand("PR_Admins_DeleteById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@admin_id", id);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i > 0)
            {

                Response res = new Response();
                res.message = "Data Deleted";
                return Ok(res);
            }
            else
            {
                Response res = new Response();
                res.message = "Data Not Deleted";
                return Ok(res);

            }
        }


        [HttpPost]
        [Route("Admin/Login")]
        public IActionResult adminLogin([FromBody] Admins admin)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Admins_Login", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@username", admin.username);
            cmd.Parameters.AddWithValue("@password", admin.password);
            Admins adminObj = new Admins();
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    adminObj.admin_id = Convert.ToInt32(reader["admin_id"]);
                    adminObj.fullname = Convert.ToString(reader["fullname"]);
                    adminObj.username = Convert.ToString(reader["username"]);
                    adminObj.password = Convert.ToString(reader["password"]);
                    adminObj.gender = Convert.ToString(reader["gender"]);
                    adminObj.address = Convert.ToString(reader["address"]);
                    adminObj.mobile = Convert.ToString(reader["mobile"]);
                    adminObj.status = Convert.ToInt32(reader["status"]);
                    adminObj.created_at = Convert.ToString(reader["created_at"]);
                    adminObj.updated_at = Convert.ToString(reader["updated_at"]);
                }

                return Ok(adminObj);

            }
            else
            {
                Response res = new Response();
                res.message = "Invalid Username & Password";
                return Ok(res);
            }
        }

    }

}
