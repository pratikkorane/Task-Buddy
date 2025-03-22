using System.ComponentModel.DataAnnotations;

namespace TaskBuddyApi.Model
{
    public class Admin
    {


            [Key]
            public int AdminId { get; set; }

            [Required]
            public string Name { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; }=DateTime.UtcNow;
            public bool IsDeleted { get; set; } = false;
        }
    }






