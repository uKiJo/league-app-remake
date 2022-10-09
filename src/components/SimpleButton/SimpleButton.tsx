import React from 'react';
import classnames from 'classnames';

interface SimpleButtonProps {
  content: string | JSX.Element;
  styling?: string;
  icon?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  content,
  icon,
  styling,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={classnames(
        ` p-2 rounded-sm font-bold flex items-center justify-center ${styling} h-[36px] mr-2 transition-colors	`
      )}
    >
      {content || icon}
    </button>
  );
};

export default SimpleButton;
