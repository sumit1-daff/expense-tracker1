import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideDrawer from "../../components/SideDrawer";
import { useForm } from "react-hook-form";

export default function EditTransaction() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  
  const categories = ['Income', 'Expense'];
  const subcategories = {
    Income: ['Salary', 'Shares', 'Other'],
    Expense: ['Food', 'Rent', 'Travel', 'Subscription', 'Grocery', 'Vegetables', 'Other'],
  };

  const fetchTransaction = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/transactions/get-transaction/${id}` , {
          credentials : 'include',
        }
      );
      if (response.ok) {
        const result = await response.json();
        const formattedTransaction = {
          ...result,
          date: new Date(result.date).toISOString().split("T")[0],
        };
        setSelectedCategory(formattedTransaction.transaction_type);
        setSelectedSubcategory(formattedTransaction.category);

        setTransaction(formattedTransaction); 
        reset(formattedTransaction);
      } else {
        alert("Some error occurred");
        console.log("Not successful");
      }
    } catch (err) {
      console.log(err);
      console.log("Some error occurred");
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    setIsCategoryOpen(false);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsSubcategoryOpen(false);
  };

  const onSubmit = async (data) => {
   try{
    const response = await fetch(`http://localhost:3000/transactions/update-transaction/${id}`,{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      credentials : 'include',
      body : JSON.stringify(data)
    });
    if(response.ok){
      alert("Data updated successfully!!");
      console.log("data updated");
      navigate('/transactions');
    }
   }catch(err){
    console.log("Error occured while submitting the form");
    console.log(err);
   }
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <SideDrawer />
        <div className="w-full h-screen">
          <div className="mx-auto my-10 w-4/5">
            <h1 className="text-center font-bold text-5xl mx-auto my-10">
              Edit Transaction
            </h1>
            <div className="my-10">
              <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                <div className={`w-4/5 mx-auto my-4`}>
                  <input
                    type="text"
                    {...register("title", {
                      required: { value: true, message: "**Required Field" },
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: "Invalid data",
                      },
                    })}
                    className="mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg"
                    placeholder="Enter Expense Name"
                  />
                  <div className="h-3">
                    {errors.name && (
                      <span className="text-sm text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-4/5 mx-auto my-4">
                  <div className="flex justify-between">
                    <div className="relative box-border mr-2 w-1/2 inline-block">
                      <div
                        className="border rounded-lg border-slate-500 bg-white p-3 cursor-pointer"
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      >
                        {!selectedCategory ? (
                          <span className="text-gray-400">Category</span>
                        ) : <span>{selectedCategory}</span>}
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

                    <div className="relative box-border ml-2 w-1/2 inline-block">
                      <div
                        className={`border rounded-lg border-slate-500 bg-white p-3 ${
                          selectedCategory
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
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
                            <span className="text-gray-400">Select Subcategory</span>
                          ))}
                      </div>
                      {isSubcategoryOpen && selectedCategory && (
                        <ul className="absolute left-0 mt-1 w-full border border-gray-300 bg-white z-10">
                          {subcategories[selectedCategory].map(
                            (subcategory, index) => (
                              <li
                                key={index}
                                className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
                                onClick={() =>
                                  handleSubcategorySelect(subcategory)
                                }
                              >
                                {subcategory}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-4/5 mx-auto my-4">
                  <input
                    type="number"
                    {...register("amount", {
                      required: { value: true, message: "**Required Field" },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Enter Valid Amount",
                      },
                    })}
                    className="mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg"
                    placeholder="Enter Amount"
                  />
                  <div className="h-3 text-sm text-red-500">
                    {errors.amount && <span>{errors.amount.message}</span>}
                  </div>
                </div>

                <div className="w-4/5 mx-auto my-4">
                  <input
                    type="date"
                    {...register("date", {
                      required: { value: true, message: "**Required Field" },
                    })}
                    className="mx-auto w-full h-12 p-2 border text-gray-400 border-slate-500 rounded-lg"
                  />
                  <div className="h-3 text-sm text-red-500">
                    {errors.date && <span>{errors.date.message}</span>}
                  </div>
                </div>

                <div className={`w-4/5 mx-auto my-4`}>
                  <input
                    type="text"
                    {...register("description", {
                      required: { value: true, message: "**Required Field" },
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: "Invalid data",
                      },
                    })}
                    className="mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg"
                    placeholder="Enter Transaction Description"
                  />
                  <div className="h-3 text-sm text-red-500">
                    {errors.description && (
                      <span>{errors.description.message}</span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="w-4/5 mx-auto my-4">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 p-3 text-center text-white hover:bg-blue-800 active:scale-95 w-full"
                  >
                    Save Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
