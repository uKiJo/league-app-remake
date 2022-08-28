import React from 'react';

interface FormInputProps {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value: string;
  type: string;
}

const FormInput: React.FC<FormInputProps> = ({
  handleChange,
  label,
  name,
  type = 'text',
  ...otherProps
}) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        onChange={handleChange}
        name={name}
        type={type}
        className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
        {...otherProps}
        placeholder=" "
        required
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
