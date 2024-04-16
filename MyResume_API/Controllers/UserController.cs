using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MyResume_API.Models;
using System.Data;

namespace MyResume_API.Controllers
{
    public class UserController : Controller
    {
        public readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("Users/SelectAll")]
        public IActionResult getUserList()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Users_SelectAll", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            List<Users> usersList = new List<Users>();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Users userObj = new Users();
                    userObj.user_id = Convert.ToInt32(reader["user_id"]);
                    userObj.fullname = Convert.ToString(reader["fullname"]);
                    userObj.username = Convert.ToString(reader["username"]);
                    userObj.password = Convert.ToString(reader["password"]);
                    userObj.gender = Convert.ToString(reader["gender"]);
                    userObj.address = Convert.ToString(reader["address"]);
                    userObj.mobile = Convert.ToString(reader["mobile"]);
                    usersList.Add(userObj);
                }
                con.Close();
                return Ok(usersList);
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
        [Route("Users/SelectById")]
        public IActionResult getSingleUser([FromBody] int id)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Users_SelectById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@user_id", id);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                Users userObj = new Users();
                while (reader.Read())
                {
                    userObj.user_id = Convert.ToInt32(reader["user_id"]);
                    userObj.fullname = Convert.ToString(reader["fullname"]);
                    userObj.username = Convert.ToString(reader["username"]);
                    userObj.password = Convert.ToString(reader["password"]);
                    userObj.gender = Convert.ToString(reader["gender"]);
                    userObj.address = Convert.ToString(reader["address"]);
                    userObj.mobile = Convert.ToString(reader["mobile"]);
                }
                return Ok(userObj);

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
        [Route("Users/Insert")]
        public IActionResult insert([FromBody] Users user)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Users_Insert", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@fullname", user.fullname);
            cmd.Parameters.AddWithValue("@username", user.username);
            cmd.Parameters.AddWithValue("@password", user.password);
            cmd.Parameters.AddWithValue("@gender", user.gender);
            cmd.Parameters.AddWithValue("@address", user.address);
            cmd.Parameters.AddWithValue("@mobile", user.mobile);
            con.Open();
            int i;
            try
            {
                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return Ok(user);
                }
            }
            catch (Exception e)
            {
                Response res = new Response();
                string temp = e.Message;
                //res.message = "Data Not Inserted... Because of : "+e.Message;
                //res.duplicateUsername = "Username Already Exists... Try To Another Username";
                res.message = "Username Already Exists... Try To Another Username";
                return Ok(res);

            }


            //int i = cmd.ExecuteNonQuery();
            //con.Close();
            if (i > 0)
            {
                Response res = new Response();
                res.message = "Data Inserted...";
                return Ok(res);
            }
            else
            {
                Response res = new Response();
                res.message = "Data Not Inserted...";
                return Ok(res);
            }

        }


        [HttpPost]
        [Route("Users/Update")]
        public IActionResult update([FromBody] Users user)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("connection"));
            SqlCommand cmd = new SqlCommand("PR_Users_UpdateById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("user_id", user.user_id);
            cmd.Parameters.AddWithValue("fullname", user.fullname);
            cmd.Parameters.AddWithValue("password", user.password);
            cmd.Parameters.AddWithValue("gender", user.gender);
            cmd.Parameters.AddWithValue("address", user.address);
            cmd.Parameters.AddWithValue("mobile", user.mobile);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i > 0)
            {
                return Ok(user);
            }
            else
            {
                Response res = new Response();
                res.message = "Data Not Updated...";
                return Ok(res);
            }
        }


        [HttpPost]
        [Route("Users/Delete")]
        public IActionResult delete([FromBody] int id)
        {
            Response res = new Response();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("connection"));
            SqlCommand cmd = new SqlCommand("PR_Users_DeleteById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@user_id", id);
            con.Open();
            int i = 0;
            try
            {
                i = cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                res.status = false;
            }
            con.Close();
            if (i > 0)
            {
                res.message = "Data Deleted...";
                res.status = true;
                return Ok(res);
            }
            else
            {
                res.message = "This user have a resume so you can not delete from here...";
                res.status = false;
                return Ok(res);
            }
        }


        [HttpPost]
        [Route("Users/Login")]
        public IActionResult userLogin([FromBody] Users user)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_Users_Login", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@username", user.username);
            cmd.Parameters.AddWithValue("@password", user.password);
            Users userObj = new Users();
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    userObj.user_id = Convert.ToInt32(reader["user_id"]);
                    userObj.fullname = Convert.ToString(reader["fullname"]);
                    userObj.username = Convert.ToString(reader["username"]);
                    userObj.password = Convert.ToString(reader["password"]);
                    userObj.gender = Convert.ToString(reader["gender"]);
                    userObj.address = Convert.ToString(reader["address"]);
                    userObj.mobile = Convert.ToString(reader["mobile"]);
                    //userObj.status = Convert.ToInt32(reader["status"]);
                    //userObj.created_at = Convert.ToString(reader["created_at"]);
                    //userObj.updated_at = Convert.ToString(reader["updated_at"]);
                }

                return Ok(userObj);

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
