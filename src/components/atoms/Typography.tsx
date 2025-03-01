// src/components/atoms/Typography.tsx
import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant = 'p', children, className }) => {
  const Tag = variant;  // Utiliza el 'variant' como el tag HTML

  return (
    <Tag className={className}>{children}</Tag>
  );
};

export default Typography;