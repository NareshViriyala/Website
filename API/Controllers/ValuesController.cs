using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<Value> Get()
        {
            return new Value[] { new Value {Id = 1, Text = "Value2"}, new Value {Id = 2, Text = "Value 2"} };
        }

        // GET api/values/5
        [HttpGet("{id:int}")]
        public Value Get(int id)
        {
            return new Value {Id = id, Text = "Get Int" + id.ToString()};
        }

        // POST api/values
        [HttpPost]
        [Produces("application/json", Type = typeof(Value))]
        [Consumes("application/json")]
        public IActionResult Post([FromBody]Value value)
        {
            try{
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            return CreatedAtAction("Get", new {id = value.Id}, value);
            }
            catch(Exception ex){
                return BadRequest(ex);
            }
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
