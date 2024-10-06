import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children, className }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 ${className}`}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;