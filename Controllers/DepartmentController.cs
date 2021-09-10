using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Controllers
{
    public class DepartmentController : Controller
    {
        private readonly ReactCrudDemoDBContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public DepartmentController(ReactCrudDemoDBContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        [Route("api/Department/Index")]
        public async Task<ActionResult<IEnumerable<Department>>> Index()
        {
            return await _context.Departments
                .Select(x => new Department()
                {
                   DepartmentId=x.DepartmentId,
                   DepartmentName=x.DepartmentName
                }).ToListAsync();
        }

    }
}
