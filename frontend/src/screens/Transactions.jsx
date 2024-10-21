import React, { useEffect, useState } from 'react';

const Transactions = () => {
    // State to store transaction data
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const fetchTransactions = async () => {
      try {
          const response = await fetch('http://localhost:3000/transactions/get-transactions');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          console.log(response);
          const data = await response.json();
          console.log(data);
          setTransactions(data); // Set the fetched data to state
      } catch (error) {
          console.error('Error fetching transactions:', error);
          setError(error.message); // Set error state
      } finally {
          setLoading(false); // Stop loading once data is fetched or an error occurs
      }
  };

    // Fetch transaction data from the backend API using fetch
    useEffect(() => {
        fetchTransactions();
    }, []);

    if (loading) {
        return <p>Loading transactions...</p>; // Display a loading message while fetching
    }

    if (error) {
        return <p>Error: {error}</p>; // Display error message if fetch fails
    }

    return (
        <>
        <div>
          <SideDrawer/>
          <div>
            <h2>Transactions</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Transaction Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.amount}</td>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
};

export default Transactions;
