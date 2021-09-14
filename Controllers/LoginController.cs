using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
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
    public class LoginController : Controller
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
                return Ok(Json("User created successfully"));
            }
            return Ok(Json("Already registered user"));
        }

        [HttpPost]
        [Route("api/login/Login")]
        public async Task<IActionResult> Login([FromForm] User user)
        {
            var users = _context.Users.FirstOrDefault(x => x.Email == user.Email);
            if (users != null)
            {
                if (Crypto.VerifyHashedPassword(users.Password, user.Password))
                {
                    var claimsIdentity = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                    }, "Cookies");
                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                    await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);
                    return Ok(Json("login success"));
                }
                else
                {
                    return Ok(Json("the password not matched"));
                }
            }
            else
                return Ok(Json("User not exists"));
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
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("api/Login/CheckLogin")]
        public async Task<ActionResult> CheckLogin()
       {
            try
            {
                var s = HttpContext.User.Claims.ToList();
                if (s.Count == 0)
                    return StatusCode(401);
                else
                    return Ok(s[0].Value);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
