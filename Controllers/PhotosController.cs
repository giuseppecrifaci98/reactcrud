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

        public PhotosController(ReactCrudDemoDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Photos/{nome}")]
        public ActionResult GetImage(string nome)
        {
            if (nome != null)
            {
                var archivo = _context.Employees.SingleOrDefault(x => x.ImageName == nome);
                byte[] binary = archivo.ImageFileData;
                return File(binary, "image/jpeg");
            }
            else
                return NoContent();
        }
    }
}
