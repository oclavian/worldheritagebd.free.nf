import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-11 h-11' }) => {
  return (
    <img
      src={logoImg}
      alt="World Heritage Tours & Travels Logo"
      className={`${className} object-contain rounded-full shrink-0 drop-shadow-sm`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (!target.dataset.tried) {
          target.dataset.tried = '1';
          target.src = 'https://lh3.googleusercontent.com/d/1QKxKfanyW63oOZTZcJTozTiVwmusHwFC';
        }
      }}
    />
  );
};




