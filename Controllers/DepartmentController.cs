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

        [HttpPost]
        [Route("api/Department/Create")]

        public async Task<ActionResult<Employee>> Create([FromForm] Department dep)
        {
            var result = _context.Departments.Where(x => x.DepartmentName == dep.DepartmentName).FirstOrDefault();
            if (result == null)
            {
                _context.Departments.Add(dep);
                await _context.SaveChangesAsync();
                return Ok(Json(true));
            }
            return Ok(Json(false));
        }

        [HttpGet]
        [Route("api/Department/Details/{id}")]

        public async Task<ActionResult<Department>> Details(int id)
        {
            var depModel = await _context.Departments.Where(x => x.DepartmentId == id)
                .Select(y => new Department()
                {
                   DepartmentId= y.DepartmentId,
                   DepartmentName= y.DepartmentName
                })
                .FirstOrDefaultAsync();

            if (depModel == null)
                return NotFound();
            else
                return depModel;
        }

        [HttpPut]
        [Route("api/Department/Edit")]
        public async Task<IActionResult> Edit([FromForm] Department dep)
        {
      
            _context.Entry(dep).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentModelExists(dep.DepartmentId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Json("Updated"));
        }

        private bool DepartmentModelExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }

        [HttpDelete]
        [Route("api/Department/Delete/{id}")]
        public async Task<ActionResult<Department>> Delete(int id)
        {
            var depModel = await _context.Departments.FindAsync(id);
            if (depModel == null)
                return NotFound();

            _context.Departments.Remove(depModel);
            await _context.SaveChangesAsync();
            return depModel;
        }


    }
}
