import React, { MouseEvent } from 'react';

import { ReactComponent as Spinner } from './Spinner.svg';

interface CustomButtonProps {
  loading?: boolean;
  children?: string;
  type?: 'submit' | 'button' | 'reset';
  styling?: string;
  action?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading,
  children,
  type,
  styling,
  action,
}) => {
  return (
    <button
      type={type}
      className={`flex justify-center items-center p-2 rounded font-medium h-[40px] transition-colors ${styling}`}
      onClick={action}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default CustomButton;
