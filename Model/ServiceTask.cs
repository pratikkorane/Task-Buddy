using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskBuddyApi.Model
{
    public class ServiceTask
    {

       


            [Key]
            public int TaskId { get; set; }

            [Required]
            public string TaskTitle { get; set; }

            public string TaskDescription { get; set; }

            public int CustomerId { get; set; }
            [ForeignKey("CustomerId")]
            public Customer Customer { get; set; }

            public int TaskerId { get; set; }
            [ForeignKey("TaskerId")]
            public Tasker Tasker { get; set; }

            public TaskStatus Status { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
            public bool IsDeleted { get; set; } = false;
        }

        public enum TaskStatus
        {
            Pending,
            InProgress,
            Completed
            
        }
    }


