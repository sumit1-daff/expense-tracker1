import React, { useState } from 'react';
import SideDrawer from '../../components/SideDrawer';
import { useForm } from 'react-hook-form';
import CategoryDropdown from '../../components/CategoryDropdown';

export default function AddExpense() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  const handleAddTransaction = async (data) => {
    try {
      const formData = {
        ...data,
        category,
        subcategory,
      };
      const response = await fetch('http://localhost:3000/transactions/addtransaction', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        alert('Transaction added!');
        reset();
        setCategory('');
        setSubcategory('');
      } else {
        alert('Transaction could not be added');
        console.log('Transaction not added');
      }
    } catch (err) {
      console.log('Some error occurred', err);
    }
  };

  const handleCategory = ({ category, subcategory }) => {
    setCategory(category);
    setSubcategory(subcategory);
  };

  return (
    <>
      <div className="flex w-full h-screen bg-gray-100">
        <SideDrawer />
        <div className="w-full h-screen flex justify-center items-center">
          <div className="w-2/5 bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-center font-bold text-4xl text-gray-800 mb-8">Add Transaction</h1>
            <form onSubmit={handleSubmit(handleAddTransaction)} className="space-y-6">
              {/* Expense Name */}
              <div>
                <input
                  type="text"
                  {...register('name', {
                    required: { value: true, message: '**Required Field' },
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: 'Invalid name format',
                    },
                  })}
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Expense Name"
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
              </div>

              {/* Category Dropdown */}
              <div>
                <CategoryDropdown onDataPass={handleCategory} />
              </div>

              {/* Amount */}
              <div>
                <input
                  type="number"
                  {...register('amount', {
                    required: { value: true, message: '**Required Field' },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Enter a valid amount',
                    },
                  })}
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Amount"
                />
                {errors.amount && <span className="text-sm text-red-500">{errors.amount.message}</span>}
              </div>

              {/* Date */}
              <div>
                <input
                  type="date"
                  {...register('date', {
                    required: { value: true, message: '**Required Field' },
                  })}
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg text-gray-500 focus:border-blue-500 focus:outline-none"
                />
                {errors.date && <span className="text-sm text-red-500">{errors.date.message}</span>}
              </div>

              {/* Description */}
              <div>
                <input
                  type="text"
                  {...register('description', {
                    required: { value: true, message: '**Required Field' },
                    pattern: {
                      value: /^[a-zA-Z 0-9]+$/,
                      message: 'Invalid description',
                    },
                  })}
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Description"
                />
                {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none transition-all duration-300"
                >
                  {isSubmitting ? 'Adding...' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
