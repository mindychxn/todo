import React, { useRef } from 'react';

const GlassCard = React.forwardRef(({ children, className }, ref) => {
  return (
    <div
      className={`flex bg-white/40 backdrop-blur-sm border-white/40 min-w-fit ${className}`}
    >
      {children}
    </div>
  );
});

export default GlassCard;
