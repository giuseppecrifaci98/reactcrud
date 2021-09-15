using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReactCrudDemo.Controllers;
using ReactCrudDemo.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;

namespace ReactCrudDemoTest.CityTest
{
    [TestClass]
    public class TestCityController
    {
        private readonly ReactCrudDemoDBContext _context = new ReactCrudDemoDBContext();

        private TransactionScope scope;

        [TestInitialize]
        public void Initialize()
        {
            this.scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        }

        [TestCleanup]
        public void TestCleanup()
        {
            this.scope.Dispose();
        }

        [TestMethod]
        public async Task GetCity()
        {
            var controller = new CityController();
            var result = await controller.Index();
            if (result.Result == null)
                Assert.IsNull(result.Result);
            else
                Assert.IsNotNull(result.Result);
        }

        [TestMethod]
        public void Create()
        {
            var result = 0;
            var controller = new CityController();
            var newItem = new City() { CityName = "CityForTest" };
            result = controller.Create(newItem);
            Assert.AreEqual(1, result);

        }

        [TestMethod]
        [DataRow(4019)]
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
            var items = new City() { CityName = "Padova", CityId = 4019 };
            var result = controller.Edit(items);
            Assert.AreEqual(1, result);

        }


        [TestMethod]
        [DataRow(2004)]
        public void Delete(int id)
        {
            var controller = new CityController();
            var result = controller.Delete(id);
            if (result == 0)
                Assert.AreEqual(0, result);
            else if (result == 1)
                Assert.AreEqual(1, result);


        }

    }
}
