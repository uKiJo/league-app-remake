import React from 'react';
import classnames from 'classnames';

interface SimpleButtonProps {
  content: string;
  width: string;
  color: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  content,
  width,
  color,
}) => {
  return (
    <button
      className={classnames(
        `bg-${color}-500 p-2 w-${width} rounded-sm font-bold text-white hover:bg-${color}-400 h-[42px] mr-2`
      )}
    >
      {content}
    </button>
  );
};

export default SimpleButton;
