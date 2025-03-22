using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TaskBuddyApi.Data;
using TaskBuddyApi.DTO;
using TaskBuddyApi.Model;

namespace TaskBuddyApi.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        private readonly IPasswordHasher<Customer>  _passwordHasher;
        private readonly IConfiguration _configuration;

        public CustomerController(ApplicationDBContext dBContext, IPasswordHasher<Customer> passwordHasher, IConfiguration configuration) {

            _dbContext = dBContext;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }


        [HttpPost]
        public IActionResult RegisterCustomer([FromBody]Customer customer) {
            if (customer == null) {

                return BadRequest("Customer is null");
            } else { 
            customer.Password=_passwordHasher.HashPassword(customer,customer.Password);
            customer.CreatedAt= DateTime.UtcNow;
                customer.UpdatedAt= DateTime.UtcNow;
                customer.IsDeleted= false;


                _dbContext.Customer.Add(customer);
                _dbContext.SaveChanges();
                return Ok("Cutomer Register Successfully");


            }

        }


        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var customers = _dbContext.Customer.Where(c => !c.IsDeleted).ToList();
            return Ok(customers);
        }


        [HttpDelete("{id}")]
        public IActionResult SoftDeleteCustomer(int id)
        {
            var customer = _dbContext.Customer.FirstOrDefault(c => c.CustomerId == id);
            if (customer == null)
            {
                return NotFound("Customer not found");
            }

            customer.IsDeleted = true;
            customer.UpdatedAt = DateTime.UtcNow;
            _dbContext.SaveChanges();

            return Ok("Customer  deleted successfully");
        }



        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(int id, [FromBody] Customer customerUpdate)
        {
            // Find the customer by ID
            var customer = _dbContext.Customer.FirstOrDefault(c => c.CustomerId == id);

            if (customer == null)
            {
                return NotFound("Customer not found");
            }

            if (!string.IsNullOrEmpty(customerUpdate.Name))
                customer.Name = customerUpdate.Name;
            if (!string.IsNullOrEmpty(customerUpdate.Email))
                customer.Email = customerUpdate.Email;
            if (!string.IsNullOrEmpty(customerUpdate.Phone))
                customer.Phone = customerUpdate.Phone;
            if (!string.IsNullOrEmpty(customerUpdate.Address))
                customer.Address = customerUpdate.Address;

            if (!string.IsNullOrEmpty(customerUpdate.Password))
                customer.Password = _passwordHasher.HashPassword(customer, customerUpdate.Password);

            customer.UpdatedAt = DateTime.UtcNow; 
            _dbContext.SaveChanges();

            return Ok("Customer updated successfully");
        }


        [HttpPost("login")]
        public IActionResult LoginCustomer([FromBody] LoginDTO customerLogin)
        {
            var customer = _dbContext.Customer.SingleOrDefault(c => c.Email == customerLogin.Email);
            if (customer == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            var result = _passwordHasher.VerifyHashedPassword(customer, customer.Password, customerLogin.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid credentials.");
            }

            var token = GenerateJwtToken(customer);
            return Ok(new { Token = token });
        }


        private string GenerateJwtToken(Customer customer)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, customer.CustomerId.ToString()),
                new Claim(ClaimTypes.Name, customer.Name),
                new Claim(ClaimTypes.Email, customer.Email),
                new Claim(ClaimTypes.Role, "Customer")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
