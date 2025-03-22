using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBuddyApi.Data;
using TaskBuddyApi.Model;

namespace TaskBuddyApi.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;

        public AdminController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllAdmins() { 
        var admins = _dbContext.Admins.ToList();

            return Ok(admins);
        }

    }
}
