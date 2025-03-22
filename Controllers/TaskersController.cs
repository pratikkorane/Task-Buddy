using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBuddyApi.Data;
using TaskBuddyApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using TaskBuddyApi.Model;
using TaskStatus = TaskBuddyApi.Model.TaskStatus;


namespace TaskBuddyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskerController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        private readonly IConfiguration _configuration; 

        public TaskerController(ApplicationDBContext context , IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration; 
        }



        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            // Validate request
            if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest(new { message = "Email and Password are required." });
            }

            // Check if tasker exists
            var tasker = await _context.Taskers.FirstOrDefaultAsync(t => t.Email == loginRequest.Email);

            if (tasker == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // Verify password (assuming you store hashed passwords)
            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, tasker.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // Generate JWT Token
            var token = GenerateJwtToken(tasker);

            return Ok(new
            {
                token = token,
                taskerId = tasker.TaskerId,
                fullName = tasker.FullName,
                email = tasker.Email
            });
        }

        private string GenerateJwtToken(Tasker tasker)
        {
            // Read JWT settings from appsettings.json
            var jwtKey = _configuration["Jwt:Key"];
            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];

            // Generate token
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, tasker.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim("TaskerId", tasker.TaskerId.ToString())
    };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }







        //[HttpPost]
        //public async Task<IActionResult> CreateTasker([FromBody] Tasker tasker)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    // Attach TaskCategoryId without requiring TaskCategory object
        //    var category = await _context.TaskCategories.FindAsync(tasker.TaskCategoryId);
        //    if (category == null)
        //    {
        //        return BadRequest(new { message = "Invalid TaskCategoryId." });
        //    }

        //    tasker.TaskCategory = category;

        //    _context.Taskers.Add(tasker);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetTaskerById), new { id = tasker.TaskerId }, tasker);
        //}

        //[HttpPost]
        //public async Task<IActionResult> CreateTasker([FromBody] Tasker tasker)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    // Check if the email is already registered
        //    var existingTasker = await _context.Taskers.FirstOrDefaultAsync(t => t.Email == tasker.Email);
        //    if (existingTasker != null)
        //    {
        //        return Conflict(new { message = "Tasker with this email already exists." });
        //    }

        //    // Validate TaskCategoryId
        //    var category = await _context.TaskCategories.FindAsync(tasker.TaskCategoryId);
        //    if (category == null)
        //    {
        //        return BadRequest(new { message = "Invalid TaskCategoryId." });
        //    }

        //    // Hash the password using BCrypt.Net
        //    tasker.PasswordHash = BCrypt.Net.BCrypt.HashPassword(tasker.PasswordHash);

        //    // Attach TaskCategory and set other properties
        //    tasker.TaskCategory = category;

        //    // Add Tasker to the database
        //    _context.Taskers.Add(tasker);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetTaskerById), new { id = tasker.TaskerId }, tasker);
        //}

        [HttpPost]
        public async Task<IActionResult> CreateTasker([FromBody] Tasker tasker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return validation errors
            }

            // 1. Email Exists Check (Important!)
            if (await _context.Taskers.AnyAsync(t => t.Email == tasker.Email))
            {
                return Conflict(new { message = "Tasker with this email already exists." }); // 409 Conflict
            }

            // 2. TaskCategoryId Validation (Important!)
            var category = await _context.TaskCategories.FindAsync(tasker.TaskCategoryId);
            if (category == null)
            {
                return BadRequest(new { message = "Invalid TaskCategoryId." }); // 400 Bad Request
            }

            // 3. Password Hashing (Essential!)
            tasker.PasswordHash = BCrypt.Net.BCrypt.HashPassword(tasker.PasswordHash);

            // 4. Set other properties if needed (CreatedAt is already set in the model)
            tasker.TaskCategory = category; // Set the navigation property

            // 5. Add and Save
            _context.Taskers.Add(tasker);
            await _context.SaveChangesAsync();

            // 6. Return CreatedAtAction (Best Practice)
            //return CreatedAtAction(nameof(GetTaskerById), new { id = tasker.TaskerId }, tasker);
            return Ok("registration successfull");

            // Alternative if you *don't* have a GetTaskerById action and don't want a Location header:
            // return Created(tasker); // 201 Created with the created object
            // return Ok(tasker); // 200 OK with the created object.

        }

        




        // READ All Taskers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tasker>>> GetAllTaskers()
        {
            return await _context.Taskers
                .Where(t => !t.IsDeleted) // Exclude deleted records
                .Include(t => t.TaskCategory) // Include category details
                .ToListAsync();
        }

        // READ Tasker by ID
        [HttpGet("{taskerId}/profile")]
        public async Task<ActionResult<Tasker>> GetTaskerById(int taskerId)
        {
            var tasker = await _context.Taskers
                .Include(t => t.TaskCategory)
                .FirstOrDefaultAsync(t => t.TaskerId == taskerId && !t.IsDeleted);

            if (tasker == null)
                return NotFound("Tasker not found.");

            return Ok(tasker);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTasker(int id, Tasker updatedTasker)
        {
            if (id != updatedTasker.TaskerId)
            {
                return BadRequest("Tasker ID mismatch.");
            }

            // Check if TaskCategory exists
            var categoryExists = await _context.TaskCategories
                .AnyAsync(tc => tc.TaskCategoryId == updatedTasker.TaskCategoryId);

            if (!categoryExists)
            {
                return BadRequest("TaskCategoryId does not exist.");
            }

            _context.Entry(updatedTasker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Error updating tasker: {ex.Message}");
            }

            return NoContent();
        }


        // SOFT DELETE Tasker
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTasker(int id)
        {
            var tasker = await _context.Taskers.FindAsync(id);
            if (tasker == null || tasker.IsDeleted)
                return NotFound("Tasker not found.");

            tasker.IsDeleted = true;
            tasker.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok("Tasker deleted successfully.");
        }



        [HttpGet("stats/{taskerId}")]
        public async Task<IActionResult> GetTaskerStats(int taskerId)
        {
            try
            {
                // Check if the Tasker exists
                var taskerExists = await _context.Taskers
                    .AnyAsync(tasker => tasker.TaskerId == taskerId && !tasker.IsDeleted);

                if (!taskerExists)
                {
                    return NotFound(new { Message = $"Tasker with ID {taskerId} does not exist or has been deleted." });
                }

                // Fetch task statistics from the database
                var totalTasksCompleted = await _context.ServiceTasks
                    .Where(task => task.TaskerId == taskerId && task.Status == TaskStatus.Completed && !task.IsDeleted)
                    .CountAsync();

                var pendingRequests = await _context.ServiceTasks
                    .Where(task => task.TaskerId == taskerId && task.Status == TaskStatus.Pending && !task.IsDeleted)
                    .CountAsync();

                var pendingTasks = await _context.ServiceTasks
                    .Where(task => task.TaskerId == taskerId && task.Status == TaskStatus.InProgress && !task.IsDeleted)
                    .CountAsync();

                var earningsPerMonth = await _context.ServiceTasks
                    .Where(task => task.TaskerId == taskerId && task.Status == TaskStatus.Completed && !task.IsDeleted)
                    .SumAsync(task => task.Tasker.HourlyRate); // Assuming one task equals one hour

                // Return the statistics as a JSON response
                return Ok(new
                {
                    TotalTasksCompleted = totalTasksCompleted,
                    PendingRequests = pendingRequests,
                    PendingTasks = pendingTasks,
                    EarningsPerMonth = earningsPerMonth
                });
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, new { Message = "An error occurred while fetching statistics.", Error = ex.Message });
            }
        }




        ////////////////////////////////////////////////////////////////////
        [HttpGet("{taskerId}/active-tasks")]
        public async Task<IActionResult> GetActiveTasks(int taskerId)
        {
            try
            {
                var activeTasks = await _context.ServiceTasks
                    .Where(task => task.TaskerId == taskerId && task.Status == TaskStatus.InProgress && !task.IsDeleted)
                    .Include(task => task.Customer) // Include Customer details if needed
                    .ToListAsync();

                return Ok(activeTasks.Select(task => new
                {
                    task.TaskId,
                    TaskTitle = task.TaskTitle,
                    TaskDescription = task.TaskDescription,
                    CustomerName = task.Customer.Name, // Assuming Customer has a FullName property
                    Address = task.Customer.Address, // Assuming Customer has an Address property
                    Status = task.Status.ToString(),
                    StartDate = task.CreatedAt.ToString("yyyy-MM-dd")
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Error = ex.Message });
            }
        }

        ///////////////////////////////completed tasks////////////////////////////////
        ///


        [HttpGet("{taskerId}/completed-tasks")]
        public async Task<IActionResult> GetCompletedTasks(int taskerId)
        {
            try
            {
                // Fetch completed tasks for the given TaskerId
                var completedTasks = await _context.ServiceTasks
                    .Where(task => task.TaskerId == taskerId && task.Status == TaskStatus.Completed && !task.IsDeleted)
                    .Include(task => task.Customer) // Include Customer details
                    .ToListAsync();

                // Return data in a specific format
                return Ok(completedTasks.Select(task => new
                {
                    task.TaskId,
                    TaskTitle = task.TaskTitle,
                    TaskDescription = task.TaskDescription,
                    CustomerName = task.Customer.Name, // Assuming Customer has a Name property
                    Address = task.Customer.Address, // Assuming Customer has an Address property
                    Status = task.Status.ToString(),
                    CompletionDate = task.CreatedAt.ToString("yyyy-MM-dd") // Assuming UpdatedAt represents completion date
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Error = ex.Message });
            }
        }


        ///////////////////////////////////review and rating //////////////////////////
        ///

        [HttpGet("{taskerId}/reviews")]
        public async Task<IActionResult> GetReviewsForTasker(int taskerId, int page = 1, int pageSize = 10)
        {
            // Validate if the Tasker exists
            var taskerExists = _context.Taskers.Any(t => t.TaskerId == taskerId);
            if (!taskerExists)
            {
                return NotFound(new { Message = "Tasker not found." });
            }

            // Fetch reviews for the tasker
            var reviews = await _context.Reviews
                .Where(r => r.TaskerId == taskerId && !r.IsDeleted)
                .Include(r => r.Customer) // Include Customer for Name field
                .OrderByDescending(r => r.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(r => new
                {
                    r.ReviewId,
                    r.Rating,
                    r.Comments,
                    CustomerName = r.Customer.Name, // Assuming Customer has a Name property
                    r.CreatedAt
                })
                .ToListAsync();

            return Ok(new
            {
                TotalReviews = _context.Reviews.Count(r => r.TaskerId == taskerId && !r.IsDeleted),
                CurrentPage = page,
                PageSize = pageSize,
                Reviews = reviews
            });
        }

        //////////////////////////////// payment history////////////////////////////////
        ///
        //[HttpGet("{taskerId}/payment")]
        //public async Task<IActionResult> GetTransactionHistory(int taskerId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        //{
        //    try
        //    {
        //        var transactions = await _context.TransactionHistory
        //            .Where(t => t.TaskerId == taskerId && !t.IsDeleted) // Filter by TaskerId and exclude deleted transactions
        //            .Include(t => t.Customer) // Include Customer details
        //            .OrderByDescending(t => t.CreatedAt) // Order by the latest transactions
        //            .Skip((page - 1) * pageSize) // Pagination
        //            .Take(pageSize)
        //            .ToListAsync();

        //        var totalRecords = await _context.TransactionHistory
        //            .CountAsync(t => t.TaskerId == taskerId && !t.IsDeleted);

        //        return Ok(new
        //        {
        //            TotalRecords = totalRecords,
        //            CurrentPage = page,
        //            PageSize = pageSize,
        //            Transactions = transactions.Select(t => new
        //            {
        //                t.TransactionId,
        //                t.CustomerId,
        //                CustomerName = t.Customer.Name,
        //                t.Amount,
        //                Status = t.Status.ToString(),
        //                CreatedAt = t.CreatedAt,
        //                UpdatedAt = t.UpdatedAt
        //            })
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { Message = "An error occurred while retrieving transaction history.", Error = ex.Message });
        //    }
        //}






        [HttpGet("{taskerId}/payment")]
        public async Task<IActionResult> GetTransactionHistory(
    int taskerId,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10,
    [FromQuery] string filterRange = "all-time")
        {
            try
            {
                var query = _context.TransactionHistory
                    .Where(t => t.TaskerId == taskerId && !t.IsDeleted) // Filter by TaskerId and exclude deleted transactions
                    .Include(t => t.Customer) // Include Customer details
                    .OrderByDescending(t => t.CreatedAt) // Order by the latest transactions
                    .AsQueryable();

                // Apply filter based on the filterRange parameter
                var today = DateTime.UtcNow;

                switch (filterRange.ToLower())
                {
                    case "this-week":
                        var startOfWeek = today.AddDays(-(int)today.DayOfWeek); // Start of current week (Sunday)
                        query = query.Where(t => t.CreatedAt >= startOfWeek);
                        break;

                    case "this-month":
                        var startOfMonth = new DateTime(today.Year, today.Month, 1); // Start of current month
                        query = query.Where(t => t.CreatedAt >= startOfMonth);
                        break;

                    case "this-year":
                        var startOfYear = new DateTime(today.Year, 1, 1); // Start of current year
                        query = query.Where(t => t.CreatedAt >= startOfYear);
                        break;

                    case "all-time":
                    default:
                        // No additional filtering for "all-time"
                        break;
                }

                var totalRecords = await query.CountAsync();

                var transactions = await query
                    .Skip((page - 1) * pageSize) // Pagination
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(new
                {
                    TotalRecords = totalRecords,
                    CurrentPage = page,
                    PageSize = pageSize,
                    Transactions = transactions.Select(t => new
                    {
                        t.TransactionId,
                        t.CustomerId,
                        CustomerName = t.Customer.Name,
                        t.Amount,
                        Status = t.Status.ToString(),
                        CreatedAt = t.CreatedAt,
                        UpdatedAt = t.UpdatedAt
                    })
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while retrieving transaction history.", Error = ex.Message });
            }
        }






    }
}
