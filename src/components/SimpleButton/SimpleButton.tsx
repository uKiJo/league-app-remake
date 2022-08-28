import React from 'react';
import classnames from 'classnames';
import { text } from 'node:stream/consumers';

interface SimpleButtonProps {
  content: string;
  width: string;
  bgColor: string;
  hoverColor: string;
  textColor?: string;
  generate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  content,
  width,
  bgColor,
  hoverColor,
  textColor,
  generate,
}) => {
  return (
    <button
      onClick={generate}
      className={classnames(
        `${bgColor} ${hoverColor} p-2 w-${width} rounded-sm font-bold text-${textColor} flex items-center justify-center  h-[32px] mr-2`
      )}
    >
      {content}
    </button>
  );
};

export default SimpleButton;
