using Microsoft.EntityFrameworkCore;
using TaskBuddyApi.Model;

namespace TaskBuddyApi.Data
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options):base(options) { 
        }

        public DbSet<Tasker> Taskers { get; set; }
        public DbSet<Admin>Admins { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<ServiceTask> ServiceTasks { get; set; }

        public DbSet<TaskCategory> TaskCategories { get; set; }
        public DbSet<TransactionHistory> TransactionHistory { get; set; }
        public DbSet<Review> Reviews { get; set; }  

    }
}
