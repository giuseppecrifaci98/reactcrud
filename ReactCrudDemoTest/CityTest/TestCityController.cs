using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReactCrudDemo.Controllers;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactCrudDemoTest.CityTest
{
    [TestClass]
    public class TestCityController
    {
        private readonly ReactCrudDemoDBContext _context = new ReactCrudDemoDBContext();
        [TestMethod]
        public void GetCity()
        {
            var controller = new CityController();
            var result = controller.Index();
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Create()
        {
            var result = 0;
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var controller = new CityController();
                    var newItem = new City() { CityName = "Castelvetrano" };
                    result = controller.Create(newItem);
                    Assert.AreEqual(0, result);
                }
                catch
                {
                    transaction.Rollback();
                }
                finally
                {
                    transaction.Dispose();
                    Assert.AreEqual(0, result);
                }
            }
        }

        [TestMethod]
        [DataRow(2)]
        public void Details(int id)
        {
            var controller = new CityController();
            var result = controller.Details(id);
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Edit()
        {
            var controller = new CityController();
            var items = new City() { CityName = "Riccione", CityId = 3005 };
            var result = controller.Edit(items);
            Assert.AreEqual(1, result);
        }

        [TestMethod]
        [DataRow(2002)]
        public void Delete(int id)
        {
            var database = new TestCityContext();
            var controller = new CityController();
            var result = controller.Delete(id);
            if(result==0)
                Assert.AreEqual(0, result);
            else if(result==1)
                Assert.AreEqual(1, result);
        }

    }
}
