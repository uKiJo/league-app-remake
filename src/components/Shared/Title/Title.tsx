import { motion } from 'framer-motion';
import React from 'react';

interface TitleProps {
  content: string;
  styling?: string;
  icon?: string;
}

const Title: React.FC<TitleProps> = ({ content, styling, icon }) => {
  return (
    <motion.h1
      layout
      className={`${styling} w-full text-3xl text-center text-primary font-extrabold ${icon}`}
    >
      {content}
    </motion.h1>
  );
};

export default Title;
