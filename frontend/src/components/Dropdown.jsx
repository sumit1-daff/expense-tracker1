import React, { useState } from 'react';

const Dropdown = () => {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Expense', 'Income'];

  const handleSelect = (category) => {
    setSelected(category);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative inline-block">
      <div
        className="mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || <span className=' text-slate-400'>Select a category</span>}
      </div>
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full border border-gray-300 bg-slate-100 z-10">
          {categories.map((category, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => handleSelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
