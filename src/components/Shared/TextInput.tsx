import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface TextInputProps {
  label: string;
  placeholder: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  index?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  handleChange,
  index,
  ...rest
}) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="mb-6"
    >
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-dark-grey"
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="first_name"
        className="bg-medium-grey outline-2 outline-primary border-0 text-dark-grey text-sm rounded focus:border-stroke block w-full p-2.5 "
        // placeholder="League Name"
        {...rest}
        required
      />
    </motion.div>
  );
};

export default TextInput;
