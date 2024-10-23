// import React, { useEffect, useState } from "react";
// import SideDrawer from "../../components/SideDrawer";
// import { Doughnut } from 'react-chartjs-2';
// export default function DashBoard() {
//   const [transactions, setTransactions] = useState([]);
//   const [incomeData, setIncomeData] = useState({});
//   const [expenseData, setExpenseData] = useState({});

//   const fetchTransactions = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/transactions/get-transactions",
//         {
//           credentials: "include",
//           headers: {
//             "Content-type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setTransactions(data);
//       const IncomeTransactions = data.filter(
//         (transaction)=> transaction.transaction_type === 'Income'
//       );
      
//       const ExpenseTransactions = data.filter(
//         (transaction) => transaction.transaction_type === 'Expense'
//       )

//       const incomeDates = IncomeTransactions.map((t)=> new Date(t.date).toLocaleDateString());
//       const incomeAmount = IncomeTransactions.map((t) => t.amount);
//       const expenseDates = ExpenseTransactions.map((t)=> new Date(t.date).toLocaleDateString());
//       const expenseAmount = ExpenseTransactions.map((t) => t.amount);

//       setIncomeData({
//         labels : incomeDates,
//         datasets : [
//           {label : "Income",
//             data : incomeAmount,
//           }
//         ]
//       });
//       setExpenseData({
//         labels : expenseDates,
//         datasets : [
//           {
//             label : "Expense",
//             data : expenseAmount,
//           }
//         ]
//       })

//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <div className="flex bg-gray-100">
//       <SideDrawer />
//       <div className="mx-10 mt-10 flex flex-col w-full ">
//         <div className="flex mb-10 ">
//           <div className="mr-5 w-1/2 h-72 bg-white shadow-lg rounded-lg">
//             <h1 className="font-bold text-2xl p-2">Income</h1>
//                 <Doughnut data={incomeData} />
//           </div>
//           <div className="ml-5 w-1/2 h-72 bg-white shadow-lg rounded-lg">
//             <h1 className="font-bold text-2xl p-2">Expense</h1>
//             <div className="border-2 border-black mx-10 h-48">
//               I will draw graph in this div.
//             </div>
//           </div>
//         </div>
//         <h1 className="text-2xl font-bold underline my-2">
//           Recent Transactions
//         </h1>
//         <div className="flex p-2 gap-3 w-full h-32 ">
//           {transactions.map((transaction) => (
//             <div
//               key={transaction._id}
//               className="w-60 h-32 border border-black p-2 bg-white drop-shadow-lg rounded-lg "
//             >
//               <h3 className="text-xl font-bold">{transaction.title}</h3>
//               <p
//                 className={` mt-2 text-xl ${
//                   transaction.type === "Income"
//                 }? text-green-500 : text-red-500  `}
//               >
//                 {transaction.amount}
//               </p>
//               <p>{transaction.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function DashBoard() {
  const [transactions, setTransactions] = useState([]);
  const [incomeData, setIncomeData] = useState({
    labels: [],
    datasets: []
  });
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: []
  });

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/transactions/get-transactions",
        {
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTransactions(data.slice(-4));

      // Filter income and expense transactions
      const incomeTransactions = data.filter(
        (transaction) => transaction.transaction_type === 'Income'
      );
      const expenseTransactions = data.filter(
        (transaction) => transaction.transaction_type === 'Expense'
      );

      
      const incomeDates = incomeTransactions.map((t) => new Date(t.date).toLocaleDateString());
      const incomeAmounts = incomeTransactions.map((t) => t.amount);
      const expenseDates = expenseTransactions.map((t) => new Date(t.date).toLocaleDateString());
      const expenseAmounts = expenseTransactions.map((t) => t.amount);

      
      setIncomeData({
        labels: incomeDates,
        datasets: [
          {
            label: "Income",
            data: incomeAmounts,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: true,
            tension: 0.1,
          },
        ],
      });

      setExpenseData({
        labels: expenseDates,
        datasets: [
          {
            label: "Expense",
            data: expenseAmounts,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
            tension: 0.1,
          },
        ],
      });

    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex bg-gray-100">
      <SideDrawer />
      <div className="mx-10 mt-10 flex flex-col w-full ">
        <div className="flex mb-10 ">
          <div className="mr-5 w-1/2 h-90 bg-white shadow-xl rounded-lg p-4">
            <h1 className="font-bold text-2xl mb-4">Income</h1>
            <div style={{width: "100%", height: "300px"}}>
            <Line data={incomeData}  options={{maintainAspectRatio: false}}/>
            </div>
          </div>
          <div className="ml-5 w-1/2 h-90 bg-white shadow-xl rounded-lg p-4">
            <h1 className="font-bold text-2xl mb-4">Expense</h1>
            <div style={{width: "100%", height: "300px"}}>
            <Line data={expenseData}  options={{maintainAspectRatio: false}}/>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold underline my-2">
          Some Transactions
        </h1>
        <div className="flex p-2 gap-3 w-full h-32 ">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="w-60 h-32 border border-black p-2 bg-white drop-shadow-lg rounded-lg "
            >
              <h3 className="text-xl font-bold">{transaction.title}</h3>
              <p
                className={`mt-2 text-xl ${
                  transaction.transaction_type === "Income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.amount}
              </p>
              <p>{transaction.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
