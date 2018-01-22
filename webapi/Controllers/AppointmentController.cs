using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using webapi.Helpers;
using System.Data;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Dynamic;

namespace webapi.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class AppointmentController : Controller
    {
        private readonly AppSettings _appSettings;

        public AppointmentController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public class apptData{
            public int ApptID {get; set;}
            public int UserID {get; set;}
            public string Name {get; set;}
            public string Age {get; set;}
            public string Gender {get; set;}
            public int DocId {get; set;}
            public string ApptTime {get; set;}
            public string StartTime {get; set;}
            public string EndTime {get; set;}
            public int IsCancelled {get; set;}
            public bool IsServerMap {get; set;}
            public string UType {get; set;}
            public string Remark {get; set;}
        }

        [HttpPost("ConfigAppt")]
        public IActionResult ConfigAppt([FromBody]apptData jsonString)
        {
            try
            {
                var jsonResult = new List<dynamic>(); 
                using(var sqlConnection = new SqlConnection(_appSettings.ConnectionString))
                {
                    using(var sqlCommand = new SqlCommand("dbo.ConfigureAppointment",sqlConnection))
                    {
                        string inputdata = JsonConvert.SerializeObject(jsonString);
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.Add("@JsonInput",SqlDbType.NVarChar, -1).Value = inputdata;
                        //sqlCommand.Parameters["@JsonInput"].Direction = ParameterDirection.Output;
                        sqlConnection.Open();
                        using (var dataReader = sqlCommand.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                var dataRow = new ExpandoObject() as IDictionary<string, object>;
                                for (var iFiled = 0; iFiled < dataReader.FieldCount; iFiled++)
                                    dataRow.Add(
                                        dataReader.GetName(iFiled),
                                        dataReader.IsDBNull(iFiled) ? null : dataReader[iFiled] // use null instead of {}
                                    );

                                jsonResult.Add((ExpandoObject)dataRow);
                            }
                        }
                        sqlConnection.Close();
                    }
                }
                return Ok(jsonResult[0]);
            }
            catch(Exception ex)
            {
                return BadRequest(error: ex.Message);
            }
        }
    }
}