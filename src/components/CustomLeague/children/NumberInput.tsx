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
        className="block mb-2 text-sm font-medium text-dark-grey"
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        type="number"
        min="4"
        max="11"
        id="visitors"
        {...rest}
        className="bg-medium-grey border-0 text-dark-grey text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder=""
        required
      />
    </div>
  );
};

export default NumberInput;
