import React from 'react';

interface ListItemProps {
  index: number;
  children: JSX.Element;
}

const ListItem: React.FC<ListItemProps> = ({ index, children }) => {
  return (
    <div
      className={`flex items-center p-4  ${
        index % 2 === 0 ? 'bg-light-grey' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ListItem;