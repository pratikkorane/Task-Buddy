using System.ComponentModel.DataAnnotations;


namespace TaskBuddyApi.Model
{
    public class Notifications
    {


            [Key]
            public int NotificationId { get; set; }

            public int UserId { get; set; }
            public string UserType { get; set; } // "Customer" or "Tasker"

            [Required]
            public string Message { get; set; }

            public bool IsRead { get; set; } = false;

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; }=DateTime.UtcNow;
            public bool IsDeleted { get; set; } = false;
        }
    }





