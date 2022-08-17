import React from 'react';
import classnames from 'classnames';

interface SimpleButtonProps {
  content: string;
  width: string;
  bgColor: string;
  hoverColor: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  content,
  width,
  bgColor,
  hoverColor,
}) => {
  return (
    <button
      className={classnames(
        `${bgColor} ${hoverColor} p-2 w-${width} rounded-sm font-bold text-white  h-[42px] mr-2`
      )}
    >
      {content}
    </button>
  );
};

export default SimpleButton;
