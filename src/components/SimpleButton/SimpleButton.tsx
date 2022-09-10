import React from 'react';
import classnames from 'classnames';

interface SimpleButtonProps {
  content: string | number;
  width: string;
  bgColor: string;
  hoverColor: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;
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
  borderColor,
  borderWidth,
  generate,
}) => {
  return (
    <button
      onClick={generate}
      className={classnames(
        `${bgColor} ${hoverColor} p-2 w-${width} rounded-sm font-bold ${textColor} flex items-center justify-center ${borderColor} ${borderWidth} h-[36px] mr-2 transition-colors	`
      )}
    >
      {content || icon}
    </button>
  );
};

export default SimpleButton;
