import React from 'react';

interface ListContainerProps {
  children: JSX.Element;
  listLength: number;
}

const ListContainer: React.FC<ListContainerProps> = ({
  children,
  listLength,
}) => {
  return (
    <div
      className={`flex flex-col p-6 w-[520px] bg-white rounded border-stroke border ${
        listLength ? '' : 'h-[500px]'
      } `}
    >
      {children}
    </div>
  );
};

export default ListContainer;
