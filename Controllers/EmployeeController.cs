﻿using Microsoft.AspNetCore.Hosting;
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
        private readonly EmployeeDataAccessLayer objemployee = new EmployeeDataAccessLayer();
        private readonly ReactCrudDemoDBContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public EmployeeController(ReactCrudDemoDBContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
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
                    City = x.City,
                    Department = x.Department,
                    Gender = x.Gender,
                    ImageName = x.ImageName
                }).ToListAsync();
        }

        [HttpPost]
        [Route("api/Employee/Create")]

        public async Task<ActionResult<Employee>> Create([FromForm]Employee employee)
        {
            var result = _context.Employees.Where(x => x.Name == employee.Name).FirstOrDefault();
            if (result == null)
            {
                employee.ImageName = await SaveImage(employee.ImageFile);
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
                return Ok(Json(true));
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
                    City = y.City,
                    Department = y.Department,
                    Gender = y.Gender,
                    ImageName = y.ImageName,
                    ImageSrc = $"/Photos/{ y.ImageName}"
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
                if(employe.ImageName!=null)
                    DeleteImage(employe.ImageName);

                employe.ImageName = await SaveImage(employe.ImageFile);
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
        //public int Delete(int id)
        //{
        //    return objemployee.DeleteEmployee(id);
        //}

        public async Task<ActionResult<Employee>> Delete(int id)
        {
            var employeeModel = await _context.Employees.FindAsync(id);
            if (employeeModel == null)
                return NotFound();

            DeleteImage(employeeModel.ImageName);
            _context.Employees.Remove(employeeModel);
            await _context.SaveChangesAsync();
            return employeeModel;
        }


        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageFile + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Photos", imageName);
            using(var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
            }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Photos", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

    }
}
