namespace TaskBuddyApi.DTO
{
    public class TransactionHistoryDTO2
    {
        public int TransactionId { get; set; }
        public string CustomerName { get; set; }
        public string TaskerName { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Status { get; set; }
    }
}
