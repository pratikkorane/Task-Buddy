import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const filterPayments = (payments, range) => {
  const today = new Date();
  let filteredPayments = [];

  switch (range) {
    case "last-week":
      const lastWeek = new Date(today.setDate(today.getDate() - 7));
      filteredPayments = payments.filter(
        (payment) => new Date(payment.paymentDate) >= lastWeek
      );
      break;
    case "last-month":
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
      filteredPayments = payments.filter(
        (payment) => new Date(payment.paymentDate) >= lastMonth
      );
      break;
    case "last-3-months":
      const last3Months = new Date(today.setMonth(today.getMonth() - 3));
      filteredPayments = payments.filter(
        (payment) => new Date(payment.paymentDate) >= last3Months
      );
      break;
    case "this-year":
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      filteredPayments = payments.filter(
        (payment) => new Date(payment.paymentDate) >= startOfYear
      );
      break;
    default:
      filteredPayments = payments;
  }

  return filteredPayments;
};

const TaskerViewPaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRange, setFilterRange] = useState("all-time");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        debugger ; 
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/tasker/login");
          return;
        }

        const decoded = jwtDecode(token);
        const taskerId = decoded.TaskerId;

        const response = await axios.get(
          `http://localhost:5286/api/Tasker/${taskerId}/payment?page=1&pageSize=10`
        );

        const { transactions } = response.data;

        const mappedTransactions = transactions.$values.map((transaction) => ({
          id: transaction.transactionId,
          customerName: transaction.customerName,
          paymentAmount: transaction.amount,
          paymentDate: transaction.createdAt,
          status: transaction.status,
        }));

        setPaymentHistory(mappedTransactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [navigate]);

  const filteredPayments = filterPayments(paymentHistory, filterRange);

  if (loading) {
    return (
      <div className="container mt-4 d-flex justify-content-center">
        <div className="col-md-6 p-4 border rounded shadow bg-white">
          <h2 className="text-center">Payment History</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="col-md-8 p-4 border rounded shadow bg-white">
        <h2 className="text-center">Payment History</h2>
        {/* <div className="mb-4">
          <label htmlFor="filterRange" className="form-label">
            Filter by Time Range:
          </label>
          <select
            id="filterRange"
            className="form-select"
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
          >
            <option value="all-time">All Time</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div> */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Payment Amount ($)</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.customerName}</td>
                  <td>{payment.paymentAmount}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>{payment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No payments found for the selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskerViewPaymentHistory;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const TaskerViewPaymentHistory = () => {
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterRange, setFilterRange] = useState("all-time"); // Default filter range
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPaymentHistory = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           navigate("/tasker/login");
//           return;
//         }

//         const decoded = jwtDecode(token);
//         const taskerId = decoded.TaskerId;

//         setLoading(true); // Show loading before API call
//         const response = await axios.get(
//           `http://localhost:5286/api/Tasker/${taskerId}/payment`,
//           {
//             params: {
//               page: 1,
//               pageSize: 10,
//               filterRange, // Pass filter range as a query parameter
//             },
//           }
//         );

//         const { Transactions } = response.data;

//         const mappedTransactions = Transactions.map((transaction) => ({
//           id: transaction.TransactionId,
//           customerName: transaction.CustomerName,
//           paymentAmount: transaction.Amount,
//           paymentDate: transaction.CreatedAt,
//           status: transaction.Status,
//         }));

//         setPaymentHistory(mappedTransactions);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching payment history:", error);
//         setLoading(false);
//       }
//     };

//     fetchPaymentHistory();
//   }, [navigate, filterRange]); // Re-run when filterRange changes

//   if (loading) {
//     return (
//       <div className="container mt-4 d-flex justify-content-center">
//         <div className="col-md-6 p-4 border rounded shadow bg-white">
//           <h2 className="text-center">Payment History</h2>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4 d-flex justify-content-center">
//       <div className="col-md-8 p-4 border rounded shadow bg-white">
//         <h2 className="text-center">Payment History</h2>
//         <div className="mb-4">
//           <label htmlFor="filterRange" className="form-label">
//             Filter by Time Range:
//           </label>
//           <select
//             id="filterRange"
//             className="form-select"
//             value={filterRange}
//             onChange={(e) => setFilterRange(e.target.value)} // Update filter range
//           >
//             <option value="all-time">All Time</option>
//             <option value="this-week">This Week</option>
//             <option value="this-month">This Month</option>
//             <option value="this-year">This Year</option>
//           </select>
//         </div>
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Customer Name</th>
//               <th>Payment Amount ($)</th>
//               <th>Payment Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paymentHistory.length > 0 ? (
//               paymentHistory.map((payment) => (
//                 <tr key={payment.id}>
//                   <td>{payment.customerName}</td>
//                   <td>{payment.paymentAmount}</td>
//                   <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
//                   <td>{payment.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center">
//                   No payments found for the selected range.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TaskerViewPaymentHistory;
