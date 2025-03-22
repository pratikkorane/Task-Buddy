using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TaskBuddyApi.Model
{
    public class TaskCategory
    {


            [Key]
            public int TaskCategoryId { get; set; }

            [Required]
            public string CategoryName { get; set; }

            public ICollection<Tasker> Taskers { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
            public bool IsDeleted { get; set; } = false;
        }
    }





