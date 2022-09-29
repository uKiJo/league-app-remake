import React from 'react';

interface TitleProps {
  content: string;
  backgroundColor: string;
  icon?: string;
}

const Title: React.FC<TitleProps> = ({ content, backgroundColor, icon }) => {
  return (
    <div
      className={`bg-${backgroundColor} w-full m-auto p-4 text-white text-5xl text-center font-bold rounded-t-sm ${icon}`}
    >
      <span>{content}</span>
    </div>
  );
};

export default Title;
