using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly ReactCrudDemoDBContext _context;
        public EmployeeController(ReactCrudDemoDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api/Employee/Index")]
        public async Task<ActionResult<IEnumerable<Employee>>> Index()
        {
            return await _context.Employees
                .Select(x => new Employee()
                {
                    EmployeeId = x.EmployeeId,
                    Name = x.Name,
                    CityId = x.CityId,
                    CityName = _context.Cities.Where(y => y.CityId == x.CityId).Select(z => z.CityName).FirstOrDefault(),
                    DepartmentId = x.DepartmentId,
                    DepartmentName = _context.Departments.Where(y => y.DepartmentId == x.DepartmentId).Select(z => z.DepartmentName).FirstOrDefault(),
                    Gender = x.Gender
                }).ToListAsync();
        }

        [HttpPost]
        [Route("api/Employee/Create")]

        public async Task<ActionResult<Employee>> Create([FromForm] Employee employee)
        {
            var result = _context.Employees.Where(x => x.Name == employee.Name).FirstOrDefault();
            if (result == null)
            {
                if (employee.ImageFile!=null && employee.ImageFile.Length > 0)
                {
                    //Getting FileName
                    var fileName = Path.GetFileName(employee.ImageFile.FileName);
                    //Getting file Extension
                    var fileExtension = Path.GetExtension(fileName);
                    // concatenating  FileName + FileExtension
                    var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);

                    using (var target = new MemoryStream())
                    {
                        employee.ImageFile.CopyTo(target);
                        employee.ImageFileData = target.ToArray();
                        employee.ImageName = SaveNameImage(employee.ImageFile, employee.Name);
                    }

                    _context.Employees.Add(employee);
                    await _context.SaveChangesAsync();
                    return Ok(Json(true));
                }
                else
                {
                    _context.Employees.Add(employee);
                    await _context.SaveChangesAsync();
                    return Ok(Json(true));
                }

            }
            return Ok(Json(false));
        }

        [HttpGet]
        [Route("api/Employee/Details/{id}")]

        public async Task<ActionResult<Employee>> Details(int id)
        {
            var employeeModel = await _context.Employees.Where(x => x.EmployeeId == id)
                .Select(y => new Employee()
                {
                    EmployeeId = y.EmployeeId,
                    Name = y.Name,
                    DepartmentId = y.DepartmentId,
                    CityId = y.CityId,
                    CityName = _context.Cities.Where(x => x.CityId == y.CityId).Select(z => z.CityName).FirstOrDefault(),
                    DepartmentName = _context.Departments.Where(t => t.DepartmentId == y.DepartmentId).Select(z => z.DepartmentName).FirstOrDefault(),
                    Gender = y.Gender,
                    ImageFileData = y.ImageFileData
                })
                .FirstOrDefaultAsync();

            if (employeeModel == null)
                return NotFound();
            return employeeModel;
        }

        [HttpPut]
        [Route("api/Employee/Edit")]
        public async Task<IActionResult> Edit([FromForm] Employee employe)
        {
            if (employe.ImageFile != null)
            {
                if (employe.ImageFile.Length > 0)
                {
                    //Getting FileName
                    var fileName = Path.GetFileName(employe.ImageFile.FileName);
                    //Getting file Extension
                    var fileExtension = Path.GetExtension(fileName);
                    // concatenating  FileName + FileExtension
                    var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);

                    using (var target = new MemoryStream())
                    {
                        employe.ImageFile.CopyTo(target);
                        employe.ImageFileData = target.ToArray();
                        employe.ImageName = SaveNameImage(employe.ImageFile, employe.Name);
                    }
                }
            }

            if (employe.ImageFile == null)
            {
                var employeeSaved = _context.Employees.Where(x => x.EmployeeId == employe.EmployeeId).Select(y => y.ImageName).FirstOrDefault();

                if (employeeSaved != null)
                {
                    employe.ImageName = employeeSaved;
                    employe.ImageFileData = null;
                }

            }

            _context.Entry(employe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeModelExists(employe.EmployeeId))
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

        private bool EmployeeModelExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }

        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public async Task<ActionResult<Employee>> Delete(int id)
        {
            var employeeModel = await _context.Employees.FindAsync(id);
            if (employeeModel == null)
                return NotFound();

            _context.Employees.Remove(employeeModel);
            await _context.SaveChangesAsync();
            return employeeModel;
        }


        [NonAction]
        public string SaveNameImage(IFormFile imageFile, string name)
        {
            if (imageFile != null)
            {
                string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
                imageName = name.Replace(' ', '_') + "_" + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
                return imageName;
            }
            else return null;
        }

    }
}
