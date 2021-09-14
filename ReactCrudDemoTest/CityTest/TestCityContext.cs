using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Text;

namespace ReactCrudDemoTest.CityTest
{
    class TestCityContext:IReactCrudDemoContext
    {
        public TestCityContext()
        {
            this.Cities = new TestCityDbSet();
        }
        public DbSet<City> Cities { get; set; }

        Microsoft.EntityFrameworkCore.DbSet<City> IReactCrudDemoContext.Cities => throw new NotImplementedException();

        public int SaveChanges()
        {
            return 0;
        }
        public void MarkAsModified(City item) { }
        public void Dispose() { }
    }
}
