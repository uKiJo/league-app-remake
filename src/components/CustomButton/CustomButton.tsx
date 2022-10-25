import React, { MouseEvent } from 'react';

import { ReactComponent as Spinner } from './Spinner.svg';
import { motion } from 'framer-motion';

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
    <motion.button
      layout
      type={type}
      className={`flex justify-center items-center p-2 rounded font-medium h-[40px] transition-colors ${styling}`}
      onClick={action}
    >
      {loading ? <Spinner /> : children}
    </motion.button>
  );
};

export default CustomButton;
