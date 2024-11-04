import React, { useState } from 'react';
import SideDrawer from '../components/SideDrawer';
import { useForm } from 'react-hook-form';
import CategoryDropdown from '../components/CategoryDropdown';

export default function AddTransaction() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const resetTrigger = false;
  const handleAddTransaction = async (data) => {
    try {
      const formData = {
        ...data,
        category,   
        subcategory
      };
      const response = await fetch('http://localhost:3000/transactions/addtransaction', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (response.ok) {
        alert('Transaction added!');
        reset();
        resetTrigger = true;
        setCategory('');
        setSubcategory(''); 
      } else {
        alert('Transaction could not be added');
        console.log('Transaction not added');
      }
    } catch (err) {
      console.log('Some error occurred');
      console.log(err);
    }
  };

  const handleCategory = ({ category, subcategory }) => {
    setCategory(category);
    setSubcategory(subcategory);
  };
  return (
    <>
      <div className="flex w-full h-screen">
        <SideDrawer />
        <div className="w-full h-screen">
          <div className="mx-auto my-10 w-4/5">
            <h1 className="text-center font-bold text-5xl mx-auto my-10">Add Transaction</h1>
            <div className="my-10">
              <form onSubmit={handleSubmit(handleAddTransaction)} className="mx-auto">
                <div className={`w-4/5 mx-auto my-4`}>
                  <input
                    type="text"
                    {...register(`name`, {
                      required: { value: true, message: '**Required Field' },
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: 'Invalid data',
                      },
                    })}
                    className="mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg"
                    placeholder="Enter Expense Name"
                  />
                  <div className="h-3">
                    {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
                  </div>
                </div>
                <div className="w-4/5 mx-auto my-4">
                  <CategoryDropdown resetTrigger ={resetTrigger} onDataPass={handleCategory} />
                </div>
                <div className="w-4/5 mx-auto my-4">
                  <input
                    type="number"
                    {...register('amount', {
                      required: { value: true, message: '**Required Field' },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Enter Valid Amount',
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
                    {...register('date', {
                      required: { value: true, message: '**Required Field' },
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
                    {...register('description', {
                      required: { value: true, message: '**Required Field' },
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: 'Invalid data',
                      },
                    })}
                    className="mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg"
                    placeholder="Enter Transaction Description"
                  />
                  <div className="h-3 text-sm text-red-500">
                    {errors.description && <span>{errors.description.message}</span>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="w-4/5 mx-auto my-4">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 p-3 text-center text-white hover:bg-blue-800 active:scale-95 w-full"
                  >
                    Add Transaction
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
