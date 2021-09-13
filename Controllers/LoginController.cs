using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using ReactCrudDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Helpers;

namespace ReactCrudDemo.Controllers
{
    public class LoginController : ControllerBase
    {

        private readonly ReactCrudDemoDBContext _context;
        public LoginController(ReactCrudDemoDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("api/login/Register")]
        public async Task<ActionResult<User>> Register([FromForm] User user)
        {
            var result = _context.Users.Where(x => x.Email == user.Email && x.Username == user.Username).FirstOrDefault();
            if (result == null)
            {
                var hash = Crypto.HashPassword(user.Password);
                user.Password = hash;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(true);
            }
            return Ok(false);
        }

        [HttpPost]
        [Route("api/login/Login")]
        public async Task<IActionResult> Login([FromForm] User user)
        {
            var users = _context.Users.FirstOrDefault(x => x.Email == user.Email);
                if (users!=null) {
                if (Crypto.VerifyHashedPassword(users.Password, user.Password))
                {
                    var claimsIdentity = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                    }, "Cookies");
                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                    await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("api/login/Logout")]
        public async Task<ActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
