import React from 'react';

import { ReactComponent as Spinner } from './Spinner.svg';

interface CustomButtonProps {
  loading?: boolean;
  children?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ loading, children }) => {
  return (
    <button
      // sm:w-auto
      type="submit"
      className="flex justify-center w-full text-white bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium h-12"
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default CustomButton;
