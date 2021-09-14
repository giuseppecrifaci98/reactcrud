using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ReactCrudDemo.Models;

namespace ReactCrudDemoTest.CityTest
{
    class TestCityDbSet: TestDb<City>
    {
        public override City Find(params object[] keyValues)
        {
            return this.SingleOrDefault(item => item.CityId == (int)keyValues.Single());
        }
    }
}
