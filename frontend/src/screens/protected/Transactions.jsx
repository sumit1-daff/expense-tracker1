import React, { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);

  const navigate = useNavigate();
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
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-transaction/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:3000/transactions/delete-transaction/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Transaction deleted");
          alert("Transaction deleted successfully");
          fetchTransactions(); // Refresh transactions after deletion
        } else {
          console.log("Unable to delete");
        }
      } catch (err) {
        console.log(err);
        console.log("Error occurred during deleting the transaction");
      }
    }
  };

  const categories = ["Income", "Expense"];
  const subcategories = {
    Income: ["Salary", "Shares", "Other"],
    Expense: [
      "Food",
      "Rent",
      "Travel",
      "Subscription",
      "Grocery",
      "Vegetables",
      "Other",
    ],
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory when a new category is selected
    setIsCategoryOpen(false);
    setIsSubcategoryOpen(false); // Close subcategory dropdown
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsSubcategoryOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState("");
  const handleFilter = async () => {
    console.log(selectedCategory, selectedDate, selectedSubcategory);
    const filterArray = [selectedDate, selectedCategory, selectedSubcategory];

    const response = await fetch(
      `http://localhost:3000/transactions/get-transaction/filter`,
      {
        method: "POST",
        body: filterArray,
      }
    );
  };

  return (
    <>
      <div className="flex">
        <SideDrawer />
        <div className="mx-auto w-2/3 flex flex-col my-10 items-center">
          <h1 className="text-5xl font-bold my-10">Transactions History</h1>
          <div className="w-full flex flex-col jusitfy-center">
            <div className="h-14 flex w-full justify-between mb-5">
              <div className="h-12">
                <input
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  type="month"
                  placeholder="Month"
                  className="h-12 mb-2 mr-2 border border-slate-300 rounded-lg p-2"
                />
              </div>
              <div className="flex w-2/3 ">
                <div className="relative box-border mr-2 w-60 inline-block">
                  <div
                    className="border rounded-lg border-slate-500 bg-white p-3 cursor-pointer"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    {selectedCategory || (
                      <span className="text-gray-400">Category</span>
                    )}
                  </div>
                  {isCategoryOpen && (
                    <ul className="absolute left-0 mt-1 w-full border border-gray-300 bg-white z-10">
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative box-border mx-2 w-60 inline-block">
                  <div
                    className={`border rounded-lg border-slate-500 bg-white p-3 ${
                      selectedCategory ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    onClick={() =>
                      selectedCategory &&
                      setIsSubcategoryOpen(!isSubcategoryOpen)
                    }
                  >
                    {selectedSubcategory ||
                      (selectedCategory ? (
                        <span>Sub Category ({selectedCategory})</span>
                      ) : (
                        <span className="text-gray-400">Sub Category</span>
                      ))}
                  </div>
                  {isSubcategoryOpen && selectedCategory && (
                    <ul className="absolute left-0 mt-1 w-full border border-gray-300 bg-white z-10">
                      {subcategories[selectedCategory].map(
                        (subcategory, index) => (
                          <li
                            key={index}
                            className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
                            onClick={() => handleSubcategorySelect(subcategory)}
                          >
                            {subcategory}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
              <button
                onClick={handleFilter}
                className="bg-blue-500 w-20 hover:bg-blue-800 active:scale-90 h-12 p-2 text-white rounded-lg"
              >
                Filter
              </button>
            </div>
            <table className="border border-black" border="1" cellPadding="10">
              <thead>
                <tr>
                  <th className="border border-black">Transaction Name</th>
                  <th className="border border-black">Type</th>
                  <th className="border border-black">Category</th>
                  <th className="border border-black">Amount</th>
                  <th className="border border-black">Date</th>
                  <th className="border border-black">Description</th>
                  <th className="border border-black">Options</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="text-center font-light p-5 border border-black">
                      {transaction.title}
                    </td>
                    <td className="text-center font-light p-5 border border-black">
                      {transaction.transaction_type}
                    </td>
                    <td className="text-center font-light p-5 border border-black">
                      {transaction.category}
                    </td>
                    <td className="text-center font-light p-5 border border-black">
                      {transaction.amount}
                    </td>
                    <td className="text-center font-light p-5 border border-black">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="text-center font-light p-5 border border-black">
                      {transaction.description}
                    </td>
                    <td className="text-center font-light p-5 border border-black">
                      <span
                        className="text-green-500 hover:text-green-800 hover:underline cursor-pointer"
                        onClick={() => handleEdit(transaction._id)}
                      >
                        Edit
                      </span>{" "}
                      /{" "}
                      <span
                        className="text-red-500 hover:text-red-800 hover:underline cursor-pointer"
                        onClick={() => handleDelete(transaction._id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
