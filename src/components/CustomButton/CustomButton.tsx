import React, { MouseEvent } from 'react';

import { ReactComponent as Spinner } from './Spinner.svg';

interface CustomButtonProps {
  loading?: boolean;
  children?: string;
  type?: 'submit' | 'button' | 'reset';
  action?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading,
  children,
  type,
  action,
}) => {
  return (
    <button
      type={type}
      className="flex justify-center items-center w-full text-secondary_light bg-secondary hover:bg-secondary p-3 rounded font-medium h-10 mt-4"
      onClick={action}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default CustomButton;
