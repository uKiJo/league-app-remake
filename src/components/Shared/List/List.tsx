import React from 'react';

interface ListProps {
  children: JSX.Element;
}

const List: React.FC<ListProps> = ({ children }) => {
  return (
    <div className="w-full bg-white rounded border border-stroke overflow-hidden">
      {children}
    </div>
  );
};

export default List;
