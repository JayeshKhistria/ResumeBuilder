using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using MyResume_API.Models;

namespace MyResume_API.Controllers
{
    public class UserAdminController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public UserAdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        [Route("client/list")]
        public IActionResult getClientList()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_UserAdmin_SelectAllClient", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            List<UserAdmin> clientList = new List<UserAdmin>();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    UserAdmin uaObj = new UserAdmin();
                    uaObj.UAID = Convert.ToInt32(reader["UA_ID"]);
                    uaObj.fullname = Convert.ToString(reader["fullname"]);
                    uaObj.username = Convert.ToString(reader["username"]);
                    uaObj.password = Convert.ToString(reader["password"]);
                    uaObj.gender = Convert.ToString(reader["gender"]);
                    uaObj.address = Convert.ToString(reader["address"]);
                    uaObj.mobile = Convert.ToString(reader["mobile"]);
                    uaObj.status = Convert.ToInt32(reader["status"]);
                    uaObj.created_at = Convert.ToString(reader["created_at"]);
                    uaObj.updated_at = Convert.ToString(reader["updated_at"]);
                    clientList.Add(uaObj);
                }
                con.Close();
                return Ok(clientList);
            }
            else
            {
                Response res = new Response();
                res.message = "Data Not Found";
                return Ok(res);
            }

        }


        [HttpGet]
        [Route("admin/list")]
        public IActionResult getAdminList()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_UserAdmin_SelectAllAdmin", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            List<UserAdmin> clientList = new List<UserAdmin>();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    UserAdmin uaObj = new UserAdmin();
                    uaObj.UAID = Convert.ToInt32(reader["UA_ID"]);
                    uaObj.fullname = Convert.ToString(reader["fullname"]);
                    uaObj.username = Convert.ToString(reader["username"]);
                    uaObj.password = Convert.ToString(reader["password"]);
                    uaObj.gender = Convert.ToString(reader["gender"]);
                    uaObj.address = Convert.ToString(reader["address"]);
                    uaObj.mobile = Convert.ToString(reader["mobile"]);
                    uaObj.status = Convert.ToInt32(reader["status"]);
                    uaObj.created_at = Convert.ToString(reader["created_at"]);
                    uaObj.updated_at = Convert.ToString(reader["updated_at"]);
                    clientList.Add(uaObj);
                }
                con.Close();
                return Ok(clientList);
            }
            else
            {
                Response res = new Response();
                res.message = "Data Not Found";
                return Ok(res);
            }

        }



        [HttpPost]
        [Route("client/insert")]
        public IActionResult insert([FromBody] UserAdmin uaObj)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_UserAdmin_Insert", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@fullname", uaObj.fullname);
            cmd.Parameters.AddWithValue("@username", uaObj.username);
            cmd.Parameters.AddWithValue("@password", uaObj.password);
            cmd.Parameters.AddWithValue("@gender", uaObj.gender);
            cmd.Parameters.AddWithValue("@address", uaObj.address);
            cmd.Parameters.AddWithValue("@mobile", uaObj.mobile);
            con.Open();
            int i = 0;
            try
            {
                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return Ok(uaObj);
                }
            }
            catch (Exception ex)
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
        [Route("user/update")]
        public IActionResult update([FromBody] UserAdmin uaObj)
        {
            Response res = new Response();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("connection"));
            SqlCommand cmd = new SqlCommand("PR_UserAdmin_Update", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UAID", uaObj.UAID);
            cmd.Parameters.AddWithValue("@fullname", uaObj.fullname);
            cmd.Parameters.AddWithValue("@password", uaObj.password);
            cmd.Parameters.AddWithValue("@gender", uaObj.gender);
            cmd.Parameters.AddWithValue("@address", uaObj.address);
            cmd.Parameters.AddWithValue("@mobile", uaObj.mobile);
            con.Open();
            int i = 0;
            try
            {
                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return Ok(uaObj);
                }
            }
            catch (Exception ex)
            {
                res.message = "Username Already Exists... Try To Another Username :" + ex.Message;

                return Ok(res);
            }
            return Ok(res);
        }


        [HttpPost]
        [Route("client/delete")]
        public IActionResult delete([FromBody] int id)
        {
            Response res = new Response();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("connection"));
            SqlCommand cmd = new SqlCommand("PR_UserAdmin_DeleteClientById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@clientId", id);
            con.Open();
            int i = 0;
            try
            {
                i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    res.message = "Data Deleted";
                    res.status = true;
                    return Ok(res);
                }

            }
            catch (Exception ex)
            {
                res.message = "You can't delete this user because of it have a resume so you need to first delete resume !";
                //res.status = false;
                return Ok(res);
            }
            res.message = "Data Not Deleted";
            res.status = false;
            return Ok(res);

        }


        [HttpPost]
        [Route("login")]
        public IActionResult getLogin([FromBody] UserAdmin uaModel)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Connection"));
            SqlCommand cmd = new SqlCommand("PR_UserAdmin_Login", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@username", uaModel.username);
            cmd.Parameters.AddWithValue("@password", uaModel.password);
            UserAdmin uaObj = new UserAdmin();
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    uaObj.UAID = Convert.ToInt32(reader["UA_ID"]);
                    uaObj.fullname = Convert.ToString(reader["fullname"]);
                    uaObj.username = Convert.ToString(reader["username"]);
                    uaObj.password = Convert.ToString(reader["password"]);
                    uaObj.gender = Convert.ToString(reader["gender"]);
                    uaObj.address = Convert.ToString(reader["address"]);
                    uaObj.mobile = Convert.ToString(reader["mobile"]);
                    uaObj.status = Convert.ToInt32(reader["status"]);
                    uaObj.created_at = Convert.ToString(reader["created_at"]);
                    uaObj.updated_at = Convert.ToString(reader["updated_at"]);
                }
                return Ok(uaObj);
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
