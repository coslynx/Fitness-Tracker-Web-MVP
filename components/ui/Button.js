import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className,
}) => {
  const buttonClasses = `
    ${variant === 'primary'
      ? 'bg-blue-500 hover:bg-blue-700 text-white'
      : variant === 'secondary'
      ? 'bg-gray-300 hover:bg-gray-400 text-gray-800'
      : variant === 'tertiary'
      ? 'bg-transparent hover:bg-gray-200 text-gray-800 border border-gray-300'
      : ''
    }
    ${size === 'small'
      ? 'px-3 py-2 text-sm rounded-md'
      : size === 'medium'
      ? 'px-4 py-2 text-base rounded-md'
      : size === 'large'
      ? 'px-6 py-3 text-lg rounded-lg'
      : ''
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
    rounded-md
    font-medium
    transition
    duration-150
    ease-in-out
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-blue-500
    focus-visible:ring-opacity-50
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  return (
    <button type="button" className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;