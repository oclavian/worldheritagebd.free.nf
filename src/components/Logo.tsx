import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-11 h-11' }) => {
  return (
    <img
      src="/logo.png"
      alt="World Heritage Tours & Travels Logo"
      className={`${className} object-contain rounded-full shrink-0 drop-shadow-sm`}
    />
  );
};



