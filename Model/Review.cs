using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaskBuddyApi.Model
{
    public class Review
    {

            [Key]
            public int ReviewId { get; set; }

            public int CustomerId { get; set; }
            [ForeignKey("CustomerId")]
            public Customer Customer { get; set; }

            public int TaskerId { get; set; }
            [ForeignKey("TaskerId")]
            public Tasker Tasker { get; set; }

            [Required]
            public int Rating { get; set; } // 1-5 Stars

            public string Comments { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow; 
            public bool IsDeleted { get; set; } = false;
        }
    }




