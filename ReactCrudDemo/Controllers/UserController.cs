using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;

namespace ReactCrudDemo.Controllers
{
    public class UserController : Controller
    {
        private readonly ReactCrudDemoDBContext _context;
        public UserController(ReactCrudDemoDBContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("api/User/Index")]
        public async Task<ActionResult<IEnumerable<User>>> Index()
        {
            return await _context.Users
                .Select(x => new User()
                {
                  Email=x.Email,
                  Username=x.Username,
                  UserId=x.UserId
                }).ToListAsync();
        }

        [Authorize]
        [HttpGet]
        [Route("api/User/Details/{id}")]

        public async Task<ActionResult<User>> Details(int id)
        {
            var userModel = await _context.Users.Where(x => x.UserId == id)
                .Select(y => new User()
                {
                 Email=y.Email,
                 UserId=y.UserId,
                 Username=y.Username
                })
                .FirstOrDefaultAsync();

            if (userModel == null)
                return NotFound();
            return userModel;
        }

        [Authorize]
        [HttpPut]
        [Route("api/User/Edit")]
        public async Task<ActionResult<User>> Edit([FromForm] User user)
        {
            user.Password= Crypto.HashPassword(user.Password);
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(user.UserId))
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

        public bool UserModelExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/User/Delete/{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
                return NotFound();

            _context.Users.Remove(userModel);
            await _context.SaveChangesAsync();
            return userModel;
        }


    }
}
