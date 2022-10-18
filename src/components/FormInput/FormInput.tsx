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
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-dark-grey"
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        name={name}
        type={type}
        className="bg-medium-grey h-[40px] w-full rounded px-2"
        {...otherProps}
        placeholder=""
        required
      />
    </div>
  );
};

export default FormInput;
