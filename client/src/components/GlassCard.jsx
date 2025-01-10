import React, { useRef } from 'react';

const GlassCard = React.forwardRef(({ children, className }, ref) => {
  return (
    <div
      className={`flex bg-white/40 rounded-2xl backdrop-blur-sm border-white/40 border-2  min-w-fit ${className}`}
    >
      {children}
    </div>
  );
});

export default GlassCard;
