import React from 'react';

interface SelectProps {
  label: string;
  handleChange: () => void;
}

const Select: React.FC<SelectProps> = ({ label, handleChange }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
      <select
        onChange={() => handleChange()} ///////////////// extract as component
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Home and away</option>
        <option>Once</option>
      </select>
    </div>
  );
};

export default Select;
