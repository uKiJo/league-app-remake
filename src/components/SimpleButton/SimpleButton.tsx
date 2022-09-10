import React from 'react';
import classnames from 'classnames';

interface SimpleButtonProps {
  content: string | number;
  width: string;
  bgColor: string;
  hoverColor: string;
  textColor?: string;
  generate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: JSX.Element;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  content,
  width,
  bgColor,
  hoverColor,
  textColor,
  icon,
  generate,
}) => {
  return (
    <button
      onClick={generate}
      className={classnames(
        `${bgColor} ${hoverColor} p-2 w-${width} rounded-sm font-bold ${textColor} flex items-center justify-center  h-[36px] mr-2`
      )}
    >
      {content || icon}
    </button>
  );
};

export default SimpleButton;
