using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TaskBuddyApi.Data;
using TaskBuddyApi.DTO;
using TaskBuddyApi.Model;

namespace TaskBuddyApi.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminController2 : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        private readonly IConfiguration _configuration;

        public AdminController2(ApplicationDBContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetAllAdmins()
        {
            var admins = _dbContext.Admins.ToList();

            return Ok(admins);
        }




        //[HttpPost("login")]
        //public IActionResult Login([FromBody] LoginDTO loginRequest)
        //{
        //    if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
        //    {
        //        return BadRequest(new { message = "Email and Password are required." });
        //    }

        //    var admin = _dbContext.Admins.FirstOrDefault(a => a.Email == loginRequest.Email && a.Password == loginRequest.Password);

        //    if (admin == null)
        //    {
        //        return Unauthorized(new { message = "Invalid email or password." });
        //    }

        //    // Generate JWT token
        //    var token = GenerateJwtToken(admin);

        //    return Ok(new { message = "Login successful", token = token, adminId = admin.AdminId, adminName = admin.Name });
        //}

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest(new { message = "Email and Password are required." });
            }

            // Fetch the admin by email from the database
            var admin = _dbContext.Admins.FirstOrDefault(a => a.Email == loginRequest.Email);
            if (admin == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // Compare the plain-text password directly
            if (admin.Password != loginRequest.Password)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // If valid credentials, return success message
            return Ok(new { message = "Login successful", adminId = admin.AdminId, adminName = admin.Name });
        }



        //-------------------------------------------------------------------------------------------------------------------
        //    private string GenerateJwtToken(Admin admin)
        //    {
        //        var jwtSettings = _configuration.GetSection("Jwt");

        //        string secretKey = jwtSettings["Key"];
        //        if (string.IsNullOrEmpty(secretKey))
        //        {
        //            throw new Exception("JWT Secret Key is missing from configuration.");
        //        }

        //        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        //        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //        var claims = new[]
        //        {
        //    new Claim(JwtRegisteredClaimNames.Sub, admin.AdminId.ToString()),
        //    new Claim(JwtRegisteredClaimNames.Email, admin.Email),
        //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //};

        //        var token = new JwtSecurityToken(
        //            issuer: jwtSettings["Issuer"],
        //            audience: jwtSettings["Audience"],
        //            claims: claims,
        //            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationInMinutes"])),
        //            signingCredentials: creds
        //        );

        //        return new JwtSecurityTokenHandler().WriteToken(token);
        //    }

        //code changed all same just one line changed string? secretKey = jwtSettings["Key"];
        private string GenerateJwtToken(Admin admin)
        {
            var jwtSettings = _configuration.GetSection("Jwt");

            string? secretKey = jwtSettings["Key"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new Exception("JWT Secret Key is missing from configuration.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey ?? ""));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, admin.AdminId.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, admin.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationInMinutes"] ?? "60")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        //works fine

        //[HttpGet("customers")]
        //public IActionResult GetAllCustomers()
        //{
        //    var customers = _dbContext.Customer
        //        .Where(c => !c.IsDeleted) // Exclude deleted customers
        //        .Select(c => new
        //        {
        //            c.CustomerId,
        //            c.Name,
        //            c.Email,
        //            c.Phone,
        //            Status = c.IsDeleted ? "Inactive" : "Active"
        //        })
        //        .ToList();

        //    return Ok(customers);
        //}

        //4 feb
        [HttpGet("customers")]
        public IActionResult GetAllCustomers()
        {
            var customers = _dbContext.Customer
                .Select(c => new
                {
                    c.CustomerId,
                    c.Name,
                    c.Email,
                    c.Phone,
                    Status = c.IsDeleted ? "Inactive" : "Active"
                })
                .ToList();

            return Ok(customers);
        }

        [HttpPut("toggle-customer-status/{customerId}")]
        public IActionResult ToggleCustomerStatus(int customerId)
        {
            var customer = _dbContext.Customer.FirstOrDefault(c => c.CustomerId == customerId);
            if (customer == null)
            {
                return NotFound(new { message = "Customer not found." });
            }

            // Toggle IsDeleted
            customer.IsDeleted = !customer.IsDeleted;
            _dbContext.SaveChanges();

            return Ok(new { message = "Customer status updated successfully." });
        }



        //[HttpGet("taskers")]
        //public IActionResult GetAllTaskers()
        //{
        //    var taskers = _dbContext.Taskers
        //        .Include(t => t.TaskCategory) // Include category if needed
        //        .Where(t => !t.IsDeleted) // Exclude deleted taskers
        //        .Select(t => new
        //        {
        //            t.TaskerId,
        //            t.Name,
        //            t.Email,
        //            t.Phone,
        //            Service = t.TaskCategory != null ? t.TaskCategory.CategoryName : "Unknown", // Get category name
        //            Status = t.IsDeleted ? "Inactive" : "Active"
        //        })
        //        .ToList();

        //    return Ok(taskers);
        //}


        [HttpGet("taskers")]
        public IActionResult GetAllTaskers()
        {
            var taskers = _dbContext.Taskers
                .Include(t => t.TaskCategory) // Include Task Category details
                .Select(t => new
                {
                    TaskerId = t.TaskerId,
                    Name = t.Name,
                    Email = t.Email,
                    Phone = t.Phone,
                    Service = t.TaskCategory.CategoryName, // Get Category Name
                    Status = t.IsDeleted ? "Inactive" : "Active"
                })
                .ToList();

            return Ok(taskers);
        }


        [HttpPut("toggle-tasker-status/{taskerId}")]
        public IActionResult ToggleTaskerStatus(int taskerId)
        {
            var tasker = _dbContext.Taskers.FirstOrDefault(t => t.TaskerId == taskerId);
            if (tasker == null)
            {
                return NotFound(new { message = "Tasker not found." });
            }

            // Toggle IsDeleted
            tasker.IsDeleted = !tasker.IsDeleted;
            _dbContext.SaveChanges();

            return Ok(new { message = "Tasker status updated successfully." });
        }




        [HttpPost("add-category")]
        public IActionResult AddTaskCategory([FromBody] TaskCategoryDTO categoryDTO)
        {
            if (categoryDTO == null || string.IsNullOrWhiteSpace(categoryDTO.CategoryName))
            {
                return BadRequest("Category Name is required.");
            }

            var newCategory = new TaskCategory
            {
                CategoryName = categoryDTO.CategoryName,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            _dbContext.TaskCategory.Add(newCategory);
            _dbContext.SaveChanges();

            return Ok(new { message = "Task Category added successfully", categoryId = newCategory.TaskCategoryId });
        }

        //[HttpPost("add-task")]
        //public IActionResult AddTask([FromBody] ServiceTaskDTO taskDTO)
        //{
        //    if (taskDTO == null || string.IsNullOrWhiteSpace(taskDTO.TaskTitle))
        //    {
        //        return BadRequest("Task details are required.");
        //    }

        //    // Use TaskBuddyApi.Model.TaskStatus explicitly to resolve ambiguity
        //    if (!Enum.IsDefined(typeof(TaskBuddyApi.Model.TaskStatus), taskDTO.Status))
        //    {
        //        return BadRequest("Invalid task status.");
        //    }

        //    var newTask = new ServiceTask
        //    {
        //        TaskTitle = taskDTO.TaskTitle,
        //        TaskDescription = taskDTO.TaskDescription,
        //        CustomerId = taskDTO.CustomerId,
        //        TaskerId = taskDTO.TaskerId,
        //        Status = (TaskBuddyApi.Model.TaskStatus)taskDTO.Status, // ✅ Fixed: Explicitly specify the namespace
        //        CreatedAt = DateTime.UtcNow,
        //        UpdatedAt = DateTime.UtcNow,
        //        IsDeleted = false
        //    };

        //    _dbContext.ServiceTasks.Add(newTask);
        //    _dbContext.SaveChanges();

        //    return Ok(new { message = "Task added successfully", taskId = newTask.TaskId });
        //}



        [HttpGet("active-tasks")]
        public IActionResult GetActiveTasks()
        {
            var activeTasks = _dbContext.ServiceTask
                .Include(t => t.Tasker)  // Include Tasker details
                .Include(t => t.Customer) // Include Customer details if needed
                .Where(t => !t.IsDeleted && t.Status != TaskBuddyApi.Model.TaskStatus.Completed) // Exclude Completed tasks
                .Select(t => new
                {
                    TaskId = t.TaskId,
                    TaskTitle = t.TaskTitle,
                    TaskDescription = t.TaskDescription,
                    TaskerId = t.Tasker.TaskerId,
                    TaskerName = t.Tasker.Name,
                    Category = t.Tasker.TaskCategory.CategoryName, // Get Tasker category
                    Phone = t.Tasker.Phone,
                    Status = t.Status.ToString() // Convert enum to string
                })
                .ToList();

            return Ok(activeTasks);
        }

        [HttpGet("completed-tasks")]
        public IActionResult GetCompletedTasks()
        {
            var completedTasks = _dbContext.ServiceTask
                .Include(t => t.Tasker)
                .Include(t => t.Customer)
                .Where(t => !t.IsDeleted && t.Status == TaskBuddyApi.Model.TaskStatus.Completed) // ✅ Fetch only Completed tasks
                .Select(t => new
                {
                    TaskId = t.TaskId,
                    TaskTitle = t.TaskTitle,
                    TaskDescription = t.TaskDescription,
                    TaskerId = t.Tasker.TaskerId,
                    TaskerName = t.Tasker.Name,
                    Category = t.Tasker.TaskCategory.CategoryName,
                    Phone = t.Tasker.Phone,
                    CustomerId = t.Customer.CustomerId,
                    CustomerName = t.Customer.Name,
                    Status = t.Status.ToString(), // Convert Enum to String
                    CompletedAt = t.UpdatedAt
                })
                .ToList();

            if (completedTasks.Count == 0)
            {
                return NotFound(new { message = "No completed tasks found." });
            }

            return Ok(completedTasks);
        }





        //[HttpGet("payment-history")]
        //public IActionResult GetPaymentHistory()
        //{
        //    var payments = _dbContext.TransactionHistory
        //        .Include(t => t.Customer)
        //        .Include(t => t.Tasker)
        //        .Where(t => !t.IsDeleted) // ✅ Exclude deleted transactions
        //        .Select(t => new TransactionHistoryDTO
        //        {
        //            TransactionId = t.TransactionId,
        //            CustomerName = t.Customer.Name,
        //            TaskerName = t.Tasker.Name,
        //            PaymentAmount = t.Amount,
        //            PaymentDate = t.CreatedAt, // Use CreatedAt as payment date
        //            Status = t.Status.ToString() // Convert Enum to String
        //        })
        //        .ToList();

        //    if (payments.Count == 0)
        //    {
        //        return NotFound(new { message = "No payment history found." });
        //    }

        //    return Ok(payments);
        //}

        [HttpGet("completed-payments")]
        public IActionResult GetCompletedPayments()
        {
            var completedPayments = _dbContext.TransactionHistory
                .Include(t => t.Customer)
                .Include(t => t.Tasker)
                .Where(t => !t.IsDeleted && t.Status == TaskBuddyApi.Model.TransactionStatus.Completed) // ✅ Only Completed Payments
                .Select(t => new
                {
                    TransactionId = t.TransactionId,
                    CustomerName = t.Customer.Name,
                    TaskerName = t.Tasker.Name,
                    PaymentAmount = t.Amount,
                    PaymentDate = t.CreatedAt, // ✅ Use CreatedAt as payment date
                    Status = t.Status.ToString() // ✅ Convert Enum to String
                })
                .ToList();

            if (completedPayments.Count == 0)
            {
                return NotFound(new { message = "No completed payments found." });
            }

            return Ok(completedPayments);
        }




        [HttpGet("pending-transactions")]
        public IActionResult GetPendingTransactions()
        {
            var pendingPayments = _dbContext.TransactionHistory
                .Include(t => t.Customer)
                .Include(t => t.Tasker)
                .Where(t => !t.IsDeleted && t.Status == TaskBuddyApi.Model.TransactionStatus.Pending) // ✅ Only Pending Transactions
                .Select(t => new
                {
                    TransactionId = t.TransactionId,
                    CustomerName = t.Customer.Name,
                    TaskerName = t.Tasker.Name,
                    PaymentAmount = t.Amount,
                    PaymentDate = t.CreatedAt, // ✅ Use CreatedAt as payment date
                    Status = t.Status.ToString() // ✅ Return as integer instead of string
                })
                .ToList();

            if (pendingPayments.Count == 0)
            {
                return NotFound(new { message = "No pending transactions found." });
            }

            return Ok(pendingPayments);
        }



        [HttpGet("dashboard-stats")]
        public IActionResult GetDashboardStats()
        {
            var totalCustomers = _dbContext.Customer.Count(); // Only count customers
            var totalTaskers = _dbContext.Taskers.Count();
            var activeTasks = _dbContext.ServiceTask.Count(t => !t.IsDeleted && t.Status != TaskBuddyApi.Model.TaskStatus.Completed);
            var pendingPayments = _dbContext.TransactionHistory
                                    .Where(t => !t.IsDeleted && t.Status == TaskBuddyApi.Model.TransactionStatus.Pending)
                                    .Sum(t => t.Amount); // Sum of all pending payments

            var stats = new
            {
                TotalCustomers = totalCustomers,  // ✅ Only Customers, No Taskers Counted
                TotalTaskers = totalTaskers,
                ActiveTasks = activeTasks,
                PendingPayments = pendingPayments
            };

            return Ok(stats);
        }













    }
}
