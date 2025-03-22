using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskBuddyApi.Model
{
    public class Tasker
    {
        [Key]
        public int TaskerId { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
       
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Phone { get; set; }

        public string City { get; set; }

        [Required]
        public int Experience { get; set; }

        [Required]
        public decimal HourlyRate { get; set; }

        public string GovernmentId { get; set; }

        public string Bio { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public bool IsDeleted { get; set; } = false;

        // Foreign key for TaskCategory (Represents Skills)
        [Required]
        public int TaskCategoryId { get; set; }

        [ForeignKey("TaskCategoryId")]
        public TaskCategory? TaskCategory { get; set; } // Made Nullable

        public ICollection<ServiceTask>? Tasks { get; set; } // Made Nullable
    }
}
