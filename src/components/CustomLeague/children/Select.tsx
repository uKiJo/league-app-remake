import { motion } from 'framer-motion';
import React from 'react';

interface SelectProps {
  label: string;
  handleChange: () => void;
}

const Select: React.FC<SelectProps> = ({ label, handleChange }) => {
  return (
    <div>
      <label
        // htmlFor="countries"
        className="block mb-2 text-sm font-medium text-dark-grey "
      >
        {label}
      </label>
      <select
        onChange={() => handleChange()} ///////////////// extract as component
        className="bg-medium-grey border-0 text-dark-grey text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option selected>Home and away</option>
        <option>Once</option>
      </select>
    </div>
  );
};

export default Select;
