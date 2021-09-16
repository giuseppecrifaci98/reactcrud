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

namespace ReactCrudDemoTest.TasksTest
{
    [TestClass]
    public class TestTaskController
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
        [DataRow("mario.rossi@email.it")]
        public async Task GetTasks(string email)
        {
            var controller = new TasksController(_context);
            var result = await controller.Index(email);
            if (result.Result == null)
                Assert.IsNull(result.Result);
            else
                Assert.IsNotNull(result.Result);
        }

        [TestMethod]
        public async Task Create()
        {
            var controller = new TasksController(_context);
            var items = new Tasks() { TasksName="New Test Task", UserEmail="mario.rossi@email.it", TaskStatusId=2 };
            var resultController = await controller.Create(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClass>(convertJsonResult);
            Assert.AreEqual(true, jsonConvertedReuslt.Value);
        }

        [TestMethod]
        [DataRow(1)]
        public async Task Details(int id)
        {
            var controller = new TasksController(_context);
            var resultController = await controller.Details(id);
            if (resultController.Value != null)
                Assert.IsNotNull(resultController.Value);
        }

        [TestMethod]
        [DataRow(2000)]
        public async Task DetailsNotFound(int id)
        {
            var controller = new TasksController(_context);
            var resultController = await controller.Details(id);
            Assert.IsNull(resultController.Value);
        }

        [TestMethod]
        public async Task Edit()
        {
            var controller = new TasksController(_context);
            var items = new Tasks() { TasksName = "Task edit di test", UserEmail="mario.rossi@email.it", TaskStatusId = 2, TasksId=1 };
            var resultController = await controller.Edit(items);
            var result = resultController.Result as OkObjectResult;
            var convertJsonResult = JsonSerializer.Serialize(result.Value);
            var jsonConvertedReuslt = JsonSerializer.Deserialize<JsonConvertedClassReturnValue>(convertJsonResult);
            Assert.AreEqual("Updated", jsonConvertedReuslt.Value);
        }

        [TestMethod]
        public async Task NoEditBecauseElementNotFound()
        {
            var controller = new TasksController(_context);
            var items = new Tasks() { TasksName = "Task edit di test", UserId = 3, TaskStatusId = 2, TasksId = 1000 };
            var resultController = await controller.Edit(items);
            var result = resultController.Result as NotFoundResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod]
        [DataRow(1)]
        public void TasksModelExists(int id)
        {
            var controller = new TasksController(_context);
            var result = controller.TaskModelModelExists(id);
            Assert.IsTrue(result);
        }

        [TestMethod]
        [DataRow(3009)]
        public void TaskModelNotExists(int id)
        {
            var controller = new TasksController(_context);
            var result = controller.TaskModelModelExists(id);
            Assert.IsFalse(result);
        }

        [TestMethod]
        [DataRow(1000)]
        public async Task DeleteTaskNotExist(int id)
        {
            var controller = new TasksController(_context);
            var resultController = await controller.Delete(id);
            var result = resultController.Result as NotFoundResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [TestMethod]
        [DataRow(1)]
        public async Task Delete(int id)
        {
            var controller = new TasksController(_context);
            var resultController = await controller.Delete(id);
            if (resultController.Value != null)
                Assert.IsNotNull(resultController.Value);
        }


        [TestMethod]
        public async Task GetTaskStatus()
        {
            var controller = new TasksController(_context);
            var result = await controller.getTasksStatus();
            if (result.Result == null)
                Assert.IsNull(result.Result);
            else
                Assert.IsNotNull(result.Result);
        }
    }
}
