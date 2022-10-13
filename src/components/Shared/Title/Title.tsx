import React from 'react';

interface TitleProps {
  content: string;
  styling?: string;
  icon?: string;
}

const Title: React.FC<TitleProps> = ({ content, styling, icon }) => {
  return (
    <div
      className={`${styling} w-full text-3xl text-center text-primary font-extrabold ${icon}`}
    >
      {content}
    </div>
  );
};

export default Title;
