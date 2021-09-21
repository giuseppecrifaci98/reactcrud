using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReactCrudDemo.Controllers;
using ReactCrudDemo.Models;
using ReactCrudDemoTest.Class;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;

namespace ReactCrudDemoTest.UserTest
{
    [TestClass]
    public class TestUserController
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
        public async Task GetUsers()
        {
            var controller = new UserController(_context);
            var result = await controller.Index();
            if (result.Result == null)
                Assert.IsNull(result.Result);
            else
                Assert.IsNotNull(result.Result);
        }

        [TestMethod]
        [DataRow(3)]
        public async Task DetailsUser(int id)
        {
            var controller = new UserController(_context);
            var resultController = await controller.Details(id);
            if (resultController.Value != null)
                Assert.IsNotNull(resultController.Value);
        }

        [TestMethod]
        [DataRow(1000)]
        public async Task DetailsUserNotFound(int id)
        {
            var controller = new UserController(_context);
            var resultController = await controller.Details(id);
            Assert.IsNull(resultController.Value);
        }

        [TestMethod]
        public async Task EditUser()
        {
            var controller = new UserController(_context);
            var items = new User() {Email="mario.rossi@email.it", Username = "Mario Rossi", UserId = 3, Password="1234"};
            var resultController = await controller.Edit(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClassReturnValue>(convertJsonResult);
            Assert.AreEqual("Updated", jsonConvertedReuslt.Value); 
        }

        [TestMethod]
        public async Task NoEditBecauseElementNotFound()
        {
            var controller = new UserController(_context);
            var items = new User() { Username = "Mario Venezia", UserId = 3000, Password="Pippo" };
            var resultController = await controller.Edit(items);
            var result = resultController.Result as NotFoundResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod]
        public async Task RecoveryUser()
        {
            var controller = new UserController(_context);
            var items = new User() { Email = "mario.rossi@email.it", Username = "Mario Rossi", UserId = 3, Password = "1234" };
            var resultController = await controller.Recovery(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClassReturnValue>(convertJsonResult);
            Assert.AreEqual("Updated", jsonConvertedReuslt.Value);
        }

        [TestMethod]
        public async Task RecoveryUserThanNotExist()
        {
            var controller = new UserController(_context);
            var items = new User() { Username = "Mario Venezia", UserId = 3000, Password = "Pippo" };
            var resultController = await controller.Recovery(items);
            var result = resultController.Result as NotFoundResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod]
        [DataRow(3)]
        public void UserModelExists(int id)
        {
            var controller = new UserController(_context);
            var result = controller.UserModelExists(id);
            Assert.IsTrue(result);
        }

        [TestMethod]
        [DataRow(1000)]
        public void UserModelNotExists(int id)
        {
            var controller = new UserController(_context);
            var result = controller.UserModelExists(id);
            Assert.IsFalse(result);
        }

        [TestMethod]
        [DataRow(1000)]
        public async Task DeleteUserNotExist(int id)
        {
            var controller = new UserController(_context);
            var resultController = await controller.Delete(id);
            var result = resultController.Result as NotFoundResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod]
        [DataRow(1003)]
        public async Task Delete(int id)
        {
            var controller = new UserController(_context);
            var resultController = await controller.Delete(id);
            if (resultController.Value != null)
                Assert.IsNotNull(resultController.Value);
        }
    }
}
