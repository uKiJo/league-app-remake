import React from 'react';

interface ListItemProps {
  index: boolean;
  children: JSX.Element;
  styling: string;
}

const ListItem: React.FC<ListItemProps> = ({ index, children, styling }) => {
  console.log(index);
  return (
    <div
      className={`flex items-center border-slate-200 bg-slate-50 ${styling} ${
        index ? 'border-0' : 'border-b'
      }`}
    >
      {children}
    </div>
  );
};

// index % 2 === 0

export default ListItem;
