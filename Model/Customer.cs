using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TaskBuddyApi.Model
{
    public class Customer
    {
      


            [Key]
            public int CustomerId { get; set; }

            [Required]
            public string Name { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }

            public string Phone { get; set; }
            public string Address { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; }=DateTime.UtcNow;
            public bool IsDeleted { get; set; } = false;

            public ICollection<ServiceTask> Tasks { get; set; }
        }
    }


