using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Controllers
{
    public class CityController : Controller
    {
         private readonly CityDataAccessLayer objcity = new CityDataAccessLayer();
        private IReactCrudDemoContext db = new ReactCrudDemoDBContext();

        public CityController(IReactCrudDemoContext context)
        {
            db = context;
        }

        [HttpGet]
        [Route("api/City/Index")]
        public IEnumerable<City> Index()
        {
            return objcity.GetCities();
        }

        [Authorize]
        [HttpPost]
        [Route("api/City/Create")]
        public int Create(City city)
        {
            return objcity.AddCity(city);
        }

        [Authorize]
        [HttpGet]
        [Route("api/City/Details/{id}")]
        public City Details(int id)
        {
            return objcity.GetCityData(id);
        }

        [Authorize]
        [HttpPut]
        [Route("api/City/Edit")]
        public int Edit(City city)
        {
            return objcity.UpdateCity(city);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/City/Delete/{id}")]
        public int Delete(int id)
        {
            return objcity.DeleteCities(id);
        }

    }
}
