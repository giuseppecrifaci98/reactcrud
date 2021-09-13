using Microsoft.AspNetCore.Mvc;
using ReactCrudDemo.Models;
using System.Linq;

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
