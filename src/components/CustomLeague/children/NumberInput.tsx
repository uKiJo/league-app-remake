import React from 'react';

interface NumberInputProps {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  handleChange,
  ...rest
}) => {
  return (
    <div>
      <label
        htmlFor="visitors"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        type="number"
        min="4"
        max="10"
        id="visitors"
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
        required
      />
    </div>
  );
};

export default NumberInput;
