import React from 'react';

const MentionIcon: React.FC<{ className?: string }> = ({ className }) => (
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
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M16 8v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
        <path d="M12 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"></path>
        <path d="M8 16v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2"></path>
    </svg>
);

export default MentionIcon;
