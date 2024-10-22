import React, { useEffect, useState } from 'react';
import SideDrawer from '../../components/SideDrawer';
import { useNavigate } from 'react-router-dom';
import EditTransaction from './EditTransaction';
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fetchTransactions = async () => {
      try {
          const response = await fetch('http://localhost:3000/transactions/get-transactions');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTransactions(data);
      } catch (error) {
          console.error('Error fetching transactions:', error);
          setError(error.message);
      } finally {
          setLoading(false); 
      }
  };

    useEffect(() => {
        fetchTransactions();
    }, []);

    if (loading) {
        return <p>Please wait while the transactions are beign loaded ....... </p>;
    }

    if (error) {
        return <p>Error: {error}</p>; 
    }

    const handleEdit = async (id) =>{
        navigate(`/edit-transaction/${id}`);
        fetchTransactions();
    }
    const handleDelete = async (id) =>{
        const confirmation = confirm("Delete data ??");
        if(confirmation){
        try{
        const response = await fetch(`http://localhost:3000/transactions/delete-transaction/${id}`,{
            method : "DELETE",
            headers : {
                "Content-type" : "application/json"
            }
        });
        if(response.ok){
            console.log("data deleted");
            alert("Transaction deleted successfully");
            fetchTransactions();
        }else{
            console.log("unable tp delete");
        }
        }catch(err){
            console.log(err);
            console.log("error occurred during deleting the transaction");
        }
    }else{
        return;
    }
}

    return (
        <>
        <div className='flex'>
          <SideDrawer/>
          <div className='mx-auto w-2/3 flex flex-col my-10 items-center '>
            <h1 className='text-5xl font-bold my-10'>Transactions History</h1>
            <table className='border border-black' border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th className='border border-black'>Transaction Name</th>
                        <th className='border border-black'>Type</th>
                        <th className='border border-black'>Category</th>
                        <th className='border border-black'>Amount</th>
                        <th className='border border-black'>Date</th>
                        <th className='border border-black'>Description</th>
                        <th className='border border-black'>Options</th>

                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td className='text-center font-light p-5 border border-black'>{transaction.title}</td>
                            <td className='text-center font-light p-5 border border-black'>{transaction.transaction_type}</td>
                            <td className='text-center font-light p-5 border border-black'>{transaction.category}</td>
                            <td className='text-center font-light p-5 border border-black'>{transaction.amount}</td>
                            <td className='text-center font-light p-5 border border-black'>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className='text-center font-light p-5 border border-black'>{transaction.description}</td>
                            <td className='text-center font-light p-5 border border-black'> <span className='text-green-500 hover:text-green-800 hover:underline cursor-pointer' onClick={() => handleEdit(transaction._id)}>Edit</span> / <span className='text-red-500 hover:text-red-800 hover:underline cursor-pointer' onClick={() => handleDelete(transaction._id)}>Delete</span> </td>

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


// filters :  month category type