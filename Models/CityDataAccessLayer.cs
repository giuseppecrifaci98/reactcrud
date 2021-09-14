using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Models
{
    public class CityDataAccessLayer
    {
        private readonly IReactCrudDemoContext db = new ReactCrudDemoDBContext();

        public IEnumerable<City> GetCities()
        {
            try
            {
                return db.Cities.OrderBy(x => x.CityName).Distinct().ToList();
            }
            catch
            {
                throw;
            }
        }

        // To add a city record
        public int AddCity(City city)
        {
            try
            {
                int result = 1;
                var findCity = db.Cities.Where(x => x.CityName == city.CityName).FirstOrDefault();
                if (findCity != null)
                    result = 0;
                else
                {
                    db.Cities.Add(city);
                    db.SaveChanges();
                    result = 1;
                }
                return result;
            }
            catch
            {
                throw;
            }
          
        }

        // To Update the record of particular city
        public int UpdateCity(City city)
        {
            try
            {
                //db.Entry(city).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.MarkAsModified(city);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        // Get the details of a particular city
        public City GetCityData(int id)
        {
            try
            {
                City city = db.Cities.Find(id);
                return city;
            }
            catch
            {
                throw;
            }
        }

        // To Delete the record of a particular cities
        public int DeleteCities(int id)
        {
            try
            {
                City city = db.Cities.Find(id);
                db.Cities.Remove(city);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
