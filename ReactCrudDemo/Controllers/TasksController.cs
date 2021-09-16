using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactCrudDemo.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using TaskStatus = ReactCrudDemo.Models.TaskStatus;

namespace ReactCrudDemo.Controllers
{
    public class TasksController : Controller
    {
        private readonly ReactCrudDemoDBContext _context;

        public TasksController(ReactCrudDemoDBContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("api/Tasks/Index/{email}")]

        public async Task<ActionResult<IEnumerable<Tasks>>> Index(string email)
        {
            int? userid = _context.Users.Where(x => x.Email == email).Select(y => y.UserId).FirstOrDefault();

            if (userid == null)
                return NotFound();

            return await _context.Tasks.Where(x => x.UserId == userid)
                .Select(y => new Tasks()
                {
                    TasksId = y.TasksId,
                    TaskStatusName = _context.TaskStatus.Where(x => x.TaskStatusId == y.TaskStatusId).Select(z => z.TaskStatusName).FirstOrDefault(),
                    TasksName = y.TasksName,
                    UserEmail = _context.Users.Where(x => x.UserId == userid).Select(z => z.Username).FirstOrDefault(),
                })
                .ToListAsync();

        }

        [Authorize]
        [HttpPost]
        [Route("api/Tasks/Create")]

        public async Task<ActionResult<Tasks>> Create([FromForm] Tasks task)
        {
            int? userid = _context.Users.Where(x => x.Email == task.UserEmail).Select(y => y.UserId).FirstOrDefault();

            if (userid == null)
                return NotFound();

            var result = _context.Tasks.Where(x => x.TasksName == task.TasksName).FirstOrDefault();
            if (result == null)
            {
                task.UserId = (int)userid;
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();
                return Ok(Json(true));
            }
            else
                return Ok(Json(false));
        }

        [Authorize]
        [HttpGet]
        [Route("api/Tasks/Details/{id}")]

        public async Task<ActionResult<Tasks>> Details(int id)
        {
            var taskModel = await _context.Tasks.Where(x => x.TasksId == id)
                .Select(y => new Tasks()
                {
                    TasksId = y.TasksId,
                    TasksName = y.TasksName,
                    TaskStatusId = y.TaskStatusId,
                    TaskStatusName = y.TaskStatusName,
                    UserId = y.UserId,
                })
                .FirstOrDefaultAsync();

            if (taskModel == null)
                return NotFound();
            else
                return taskModel;
        }

        [Authorize]
        [HttpPut]
        [Route("api/Tasks/Edit")]
        public async Task<ActionResult<Tasks>> Edit([FromForm] Tasks task)
        {
            int? userid = _context.Users.Where(x => x.Email == task.UserEmail).Select(y => y.UserId).FirstOrDefault();

            if (userid == null)
                return NotFound();

            task.UserId = (int)userid;
            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskModelModelExists(task.TasksId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Json("Updated"));
        }

        public bool TaskModelModelExists(int id)
        {
            return _context.Tasks.Any(e => e.TasksId == id);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/Tasks/Delete/{id}")]
        public async Task<ActionResult<Tasks>> Delete(int id)
        {
            var taskmodel = await _context.Tasks.FindAsync(id);
            if (taskmodel == null)
                return NotFound();

            _context.Tasks.Remove(taskmodel);
            await _context.SaveChangesAsync();
            return taskmodel;
        }


        [Authorize]
        [HttpGet]
        [Route("api/Tasks/getTasksStatus")]
        public async Task<ActionResult<IEnumerable<Models.TaskStatus>>> getTasksStatus()
        {
            return await _context.TaskStatus
              .Select(x => new TaskStatus()
              {
                  TaskStatusId = x.TaskStatusId,
                  TaskStatusName = x.TaskStatusName
              }).ToListAsync();
        }

    }
}
