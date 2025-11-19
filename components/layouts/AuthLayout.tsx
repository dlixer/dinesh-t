

import React from 'react';
import LogoIcon from '../icons/LogoIcon';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-md mx-auto z-10">
        <div className="flex justify-center mb-8">
          <LogoIcon className="h-10" />
        </div>
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200/50">
           {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;