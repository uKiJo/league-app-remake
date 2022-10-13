import React from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  handleChange,
  ...rest
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-400"
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="first_name"
        className="bg-slate-100 border-0 text-gray-400 text-sm rounded focus:ring-blue-500 focus:border-primary block w-full p-2.5 "
        // placeholder="League Name"
        {...rest}
        required
      />
    </div>
  );
};

export default TextInput;
