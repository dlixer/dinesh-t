import React from 'react';

const LiveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
        <line x1="12" y1="2" x2="12" y2="7"></line>
        <line x1="12" y1="17" x2="12" y2="22"></line>
    </svg>
);

export default LiveIcon;
