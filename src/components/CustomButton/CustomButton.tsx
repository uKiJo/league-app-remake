import React from 'react';

import { ReactComponent as Spinner } from './Spinner.svg';

interface CustomButtonProps {
  loading?: boolean;
  children?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ loading, children }) => {
  return (
    <button
      type="submit"
      className="flex justify-center items-center w-full text-secondary_light bg-secondary hover:bg-secondary p-3 rounded font-medium h-10 mt-4"
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default CustomButton;
