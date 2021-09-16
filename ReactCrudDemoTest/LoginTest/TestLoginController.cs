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

namespace ReactCrudDemoTest.LoginTest
{
    [TestClass]
    public class TestLoginController
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
        public void Login()
        {
            var controller = new LoginController(_context);
            var items = new User() { Email = "mario.rossi@email.it", Password = "1234" };
            var resultController =  controller.VerifyLogin(items);
            Assert.AreEqual(true, resultController);
        }

        [TestMethod]
        public void LoginWithFieldNotExist()
        {
            var controller = new LoginController(_context);
            var items = new User() { Email = "rossi.mario@test.it", Password = "12345" };
            var resultController = controller.VerifyLogin(items);
            Assert.AreEqual(false, resultController);
        }

        [TestMethod]
        public async Task RegisterNewUser()
        {
            var controller = new LoginController(_context);
            var items = new User() { Email = "mario.rossi@test.it", Password = "1234", Username = "Mario Rossi Test" };
            var resultController = await controller.Register(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClassReturnValue>(convertJsonResult);
            Assert.AreEqual("User created successfully", jsonConvertedReuslt.Value);
        }

        [TestMethod]
        public async Task RegisterExistUser()
        {
            var controller = new LoginController(_context);
            var items = new User() { Email = "mario.rossi@email.it", Password = "1234", Username = "Mario Rossi" };
            var resultController = await controller.Register(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClassReturnValue>(convertJsonResult);
            Assert.AreEqual("Already registered user", jsonConvertedReuslt.Value);
        }

        [TestMethod]
        public async Task CheckLogged()
        {
            var controller = new LoginController(_context);
            var resultController = await controller.CheckLogin();
            if (resultController.Value != null)
                Assert.IsNotNull(resultController.Value);
            else
            {
                var result = resultController.Result as StatusCodeResult;
                Assert.AreEqual(401, result.StatusCode);
            }

        }

      
    }
}
