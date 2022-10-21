import React from 'react';

interface ListItemProps {
  index: number;
  children: JSX.Element;
  styling: string;
}

const ListItem: React.FC<ListItemProps> = ({ index, children, styling }) => {
  return (
    <div
      className={`flex items-center ${styling} ${
        index % 2 === 0 ? 'bg-slate-50' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ListItem;
