using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using webapi.Helpers;
using System.Data;
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace webapi.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    public class SearchController : Controller
    {

        private readonly AppSettings _appSettings;

        public SearchController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        // GET api/values/5
        [HttpGet("{id string}")]
        public IActionResult Get(string id)
        {
            var jsonResult = "[]";
            using(var connectionString = new SqlConnection(_appSettings.ConnectionString))
            {
                using(var sqlCommand = new SqlCommand("dbo.GetDocDetails",connectionString))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.Add("@Input",SqlDbType.NVarChar).Value = id;
                    connectionString.Open();
                    var reader = sqlCommand.ExecuteReader();
                    var dt = new DataTable();
                    dt.Load(reader);
                    jsonResult = JsonConvert.SerializeObject(dt);
                }
            }
            return Ok(new {Data = jsonResult});
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
