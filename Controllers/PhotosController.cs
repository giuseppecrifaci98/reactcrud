using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace ReactCrudDemo.Controllers
{
    public class PhotosController : Controller
    {
        private readonly ReactCrudDemoDBContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PhotosController(ReactCrudDemoDBContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        [Route("api/Photos/{nome}")]
        public async Task<ActionResult> GetFileSystemStoreObject(string nome)
        {
            if (nome != null)
            {
                var archivo = _context.Employees.SingleOrDefault(x => x.ImageName == nome);

                var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Photos", archivo.ImageName);

                Byte[] b = System.IO.File.ReadAllBytes(imagePath);
                return File(b, "image/jpeg");
            }
            else
                return NoContent();

        }


    }
}
