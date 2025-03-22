using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;



namespace TaskBuddyApi.Model
{
    public class TransactionHistory
    {




            [Key]
            public int TransactionId { get; set; }

            public int CustomerId { get; set; }
            [ForeignKey("CustomerId")]
            public Customer Customer { get; set; }

            public int TaskerId { get; set; }
            [ForeignKey("TaskerId")]
            public Tasker Tasker { get; set; }

            public decimal Amount { get; set; }
            public TransactionStatus Status { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
            public bool IsDeleted { get; set; } = false;
        }

        public enum TransactionStatus
        {
            Pending,
            Completed,
          
            
        }
    }





