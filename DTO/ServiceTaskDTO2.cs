namespace TaskBuddyApi.DTO
{
    public class ServiceTaskDTO2
    {
        public string TaskTitle { get; set; }
        public string? TaskDescription { get; set; }
        public int CustomerId { get; set; }
        public int TaskerId { get; set; }
        public int Status { get; set; } // Pass as integer (0, 1, 2 for Pending, InProgress, Completed)
    }
}
