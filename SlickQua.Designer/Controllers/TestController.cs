using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;


namespace SlickQua.Designer.Controllers.WebApi
{
    /// <summary>
    /// Test Controller
    /// </summary>
    public class TestController : Controller
    {
        [HttpGet]
        public string Hello()
        {
            return "Hello World!";
        }
    }
}
