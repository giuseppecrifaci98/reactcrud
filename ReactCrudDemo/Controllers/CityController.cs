using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        private readonly ReactCrudDemoDBContext _context = new ReactCrudDemoDBContext();

        [HttpGet]
        [Route("api/City/Index")]
        public async Task<ActionResult<IEnumerable<City>>> Index()
        {
            return await _context.Cities
                .Select(x => new City()
                {
                  CityId=x.CityId,
                   CityName=x.CityName,
                   Employees=x.Employees
                }).ToListAsync();
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
