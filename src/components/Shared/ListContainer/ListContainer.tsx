import React from 'react';
import { motion } from 'framer-motion';

interface ListContainerProps {
  children: JSX.Element;
  listLength?: number;
  styling?: string;
}

const ListContainer: React.FC<ListContainerProps> = ({
  children,
  listLength,
  styling,
}) => {
  return (
    <motion.div
      layout
      className={`flex flex-col p-6 bg-white shadow-md rounded border-stroke border ${
        listLength !== 0 ? '' : 'h-[500px]'
      } ${styling}`}
    >
      {children}
    </motion.div>
  );
};

export default ListContainer;
