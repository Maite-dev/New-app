// src/components/atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Función opcional para manejar el clic
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
};

export default Button;