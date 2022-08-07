import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';

interface CardProps {
  children: string;
  route: string;
}

const Card: React.FC<CardProps> = ({ children, route }) => {
  return (
    <div className="w-80 h-80 m-2 bg-gray-200 rounded  shadow-lg">
      <div className="flex-grow"></div>
      <Link to={route}>
        <CustomButton children={children} />
      </Link>
    </div>
  );
};

export default Card;
