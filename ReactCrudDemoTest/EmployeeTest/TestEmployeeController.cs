using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReactCrudDemo.Controllers;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;

namespace ReactCrudDemoTest.EmployeeTest
{
    public class JsonConvertedClass
    {
        public string ContentType { get; set; }
        public string SerializerSettings { get; set; }
        public int? StatusCode { get; set; }
        public bool Value { get; set; }
    }
    public class JsonConvertedClassReturnValue
    {
        public string ContentType { get; set; }
        public string SerializerSettings { get; set; }
        public int? StatusCode { get; set; }
        public string Value { get; set; }
    }
    [TestClass]
    public class TestEmployeeController
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
        public async Task GetEmployee()
        {
            var controller = new EmployeeController(_context);
            var result = await controller.Index();
            if (result.Result == null)
                Assert.IsNull(result.Result);
            else
                Assert.IsNotNull(result.Result);
        }

        [TestMethod]
        public async Task Create()
        {
            var controller = new EmployeeController(_context);
            var items = new Employee() { CityId= 4019, Gender="Male", Name="Federico Rossi" };
            var resultController = await controller.Create(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClass>(convertJsonResult);
            Assert.AreEqual(true, jsonConvertedReuslt.Value);
        }

        [TestMethod]
        [DataRow(3011)]
        public async Task Details(int id)
        {
            var controller = new EmployeeController(_context);
            var resultController = await controller.Details(id);
            if (resultController.Value != null)
                Assert.IsNotNull(resultController.Value);
        }

        [TestMethod]
        [DataRow(2000)]
        public async Task DetailsNotFound(int id)
        {
            var controller = new EmployeeController(_context);
            var resultController = await controller.Details(id);
            Assert.IsNull(resultController.Value);
        }

        [TestMethod]
        public async Task Edit()
        {
            var controller = new EmployeeController(_context);
            var items = new Employee() { CityId = 4019, DepartmentId = 1, Gender = "Male", Name = "Mario Rossi Test", EmployeeId= 3017 };
            var resultController = await controller.Edit(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClassReturnValue>(convertJsonResult);
            Assert.AreEqual("Updated", jsonConvertedReuslt.Value);
        }

        [TestMethod]
        public async Task NoEditBecauseElementNotFound()
        {
            var controller = new EmployeeController(_context);
            var items = new Employee() { CityId = 4019, DepartmentId = 1, Gender = "Male", Name = "Mario Rossi Test Not found" };
            var resultController = await controller.Edit(items);
            var result = resultController.Result as NotFoundResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod]
        [DataRow(3017)]
        public void EmployeeModelExists(int id)
        {
            var controller = new EmployeeController(_context);
            var result = controller.EmployeeModelExists(id);
            Assert.IsTrue(result);
        }

        [TestMethod]
        [DataRow(1000)]
        public void DepartmentModelNotExists(int id)
        {
            var controller = new EmployeeController(_context);
            var result = controller.EmployeeModelExists(id);
            Assert.IsFalse(result);
        }

        [TestMethod]
        [DataRow(1000)]
        public async Task DeleteDepertmentNotExist(int id)
        {
            var controller = new EmployeeController(_context);
            var resultController = await controller.Delete(id);
            var result = resultController.Result as NotFoundResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod]
        [DataRow(3011)]
        public async Task Delete(int id)
        {
            var controller = new EmployeeController(_context);
            var resultController = await controller.Delete(id);
            if (resultController.Value != null)
                Assert.IsNotNull(resultController.Value);
        }

    }
}
