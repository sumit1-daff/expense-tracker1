import React, { useState } from 'react';

const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);

  const categories = ['Income', 'Expense'];

  const subcategories = {
    Income: ['Salary', 'Shares', 'Other'],
    Expense: ['Food', 'Rent', 'Travel', 'Subscription', 'Grocery', 'Vegetables', 'Other'],
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when new category is selected
    setIsCategoryOpen(false);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsSubcategoryOpen(false);
  };

  return (
    <div className="space-y-4 w-full justify-between">
      {/* Category Dropdown */}
      <div className="relative w-1/3 mr-5 inline-block">
        <div
          className="border border-gray-300 bg-white p-3 cursor-pointer"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          {selectedCategory || 'Category'}
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

      {/* Subcategory Dropdown (Visible but empty until a category is selected) */}
      <div className="relative w-1/3 ml-5 inline-block">
        <div
          className={`border border-gray-300 bg-white p-3 ${
            selectedCategory ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={() => selectedCategory && setIsSubcategoryOpen(!isSubcategoryOpen)}
        >
          {selectedSubcategory ||
            (selectedCategory
              ? `Sub Category (${selectedCategory})`
              : 'Sub Category')}
        </div>
        {isSubcategoryOpen && selectedCategory && (
          <ul className="absolute left-0 mt-1 w-full border border-gray-300 bg-white z-10">
            {subcategories[selectedCategory].map((subcategory, index) => (
              <li
                key={index}
                className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={() => handleSubcategorySelect(subcategory)}
              >
                {subcategory}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryDropdown;
