using Microsoft.AspNetCore.Mvc;
using TaskBuddyApi.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using TaskBuddyApi.Data;

namespace TaskBuddyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController2 : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public HomeController2(ApplicationDBContext context)
        {
            _context = context;
        }

        // Fetch taskers by service name (which maps to TaskCategoryId internally)
        [HttpGet("taskers/{serviceName}")]
        public IActionResult GetTaskersByService(string serviceName)
        {
            // Convert serviceName to lower case and fetch the corresponding TaskCategoryId
            var category = _context.TaskCategory
                .Where(t => t.CategoryName.ToLower() == serviceName.ToLower())
                .FirstOrDefault();

            if (category == null)
            {
                return NotFound(new { message = "Service not found." });
            }

            // Fetch taskers using the TaskCategoryId
            var taskers = _context.Taskers
                .Include(t => t.TaskCategory)
                .Where(t => t.TaskCategoryId == category.TaskCategoryId && !t.IsDeleted)
                .Select(t => new
                {
                    t.TaskerId,
                    t.Name,
                    t.Email,
                    t.Phone,
                    t.Address,
                    TaskCategoryId = t.TaskCategoryId // Return the TaskCategoryId
                })
                .ToList();

            if (!taskers.Any())
            {
                return NotFound(new { message = "No taskers found for this category." });
            }

            return Ok(taskers);
        }


        //api for hiring 
        [HttpGet("tasker/{taskerId}")]
        public IActionResult GetTaskerProfile(int taskerId)
        {
            // Fetch the tasker by their TaskerId
            var tasker = _context.Taskers
                .Include(t => t.TaskCategory)  // Optional if you need to include the task category as well
                .Where(t => t.TaskerId == taskerId && !t.IsDeleted)
                .Select(t => new
                {
                    t.TaskerId,
                    t.Name,
                    t.Email,
                    t.Phone,
                    t.Address,
                    t.Description,
                    t.Skills,
                    t.HourlyRate,

                })
                .FirstOrDefault();

            if (tasker == null)
            {
                return NotFound(new { message = "Tasker not found." });
            }

            return Ok(tasker);
        }




    }
}
