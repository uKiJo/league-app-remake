import React from 'react';

interface ListContainerProps {
  children: JSX.Element;
  listLength?: number;
  styling?: string;
}

const ListContainer: React.FC<ListContainerProps> = ({
  children,
  listLength,
  styling,
}) => {
  return (
    <div
      className={`flex flex-col p-6 bg-white shadow-md rounded border-stroke border ${
        listLength !== 0 ? '' : 'h-[500px]'
      } ${styling}`}
    >
      {children}
    </div>
  );
};

export default ListContainer;
