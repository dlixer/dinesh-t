import React from 'react';
// FIX: Rewriting import to fix potential tooling issues.
import { Link, useNavigate } from 'react-router-dom';
import SparkleIcon from '../icons/SparkleIcon';

const MetaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-blue-600">
    <path fill="currentColor" d="M224 200a8 8 0 0 1-8 8h-16a8 8 0 0 1 0-16h16a8 8 0 0 1 8 8ZM90.2 110.16a75.43 75.43 0 0 0-35.31 35.31c-3.1 8.27 1.14 17.65 9.41 20.75a134.1 134.1 0 0 1 27.4 5.2a8 8 0 0 0 6.6-14.86a118.15 118.15 0 0 0-24.1-4.57a60.67 60.67 0 0 1 28.17-28.17a118.15 118.15 0 0 0 4.57 24.1a8 8 0 0 0 14.86-6.6a134.1 134.1 0 0 1-5.2-27.4c-3.1-8.27-12.48-12.51-20.75-9.41ZM128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"></path>
  </svg>
);
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ConnectInstagramPage: React.FC = () => {
  const navigate = useNavigate();
  const handleConnect = () => {
    // Simulate a successful OAuth connection and navigate to the next step
    navigate('/connect/success');
  };

  return (
    <>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            Connect Instagram Account <SparkleIcon className="w-6 h-6 text-yellow-500" />
        </h2>
        <p className="text-gray-600">Only a few steps away to go viral!</p>
      </div>

      <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-slate-50/70 text-left space-y-3">
        <div className="flex items-center gap-2">
            <MetaIcon />
            <h3 className="font-bold text-gray-800">We're a Meta-verified business</h3>
        </div>
        <p className="text-xs text-gray-600">
            We only use official Instagram APIs and processes. Your Instagram account is secure, and you stay in full control.
        </p>
        <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><CheckIcon /> Official Meta OAuth login</li>
            <li className="flex items-center gap-2"><CheckIcon /> Safe and Secure</li>
            <li className="flex items-center gap-2"><CheckIcon /> Used by 1000+ creators</li>
        </ul>
      </div>

      <div className="mt-8">
        <button
          onClick={handleConnect}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600`}
        >
          Login with Instagram
        </button>
      </div>
      
      <div className="mt-6 text-center space-y-2">
        <p className="text-xs text-gray-500">
          {/* FIX: Corrected brand name for consistency. */}
          By continuing, you agree to InstagrowaX's<br/>
          <Link to="#" className="text-purple-600">Terms of Service</Link> and <Link to="#" className="text-purple-600">Privacy Policy</Link>
        </p>
        {/* FIX: Using Link for SPA navigation instead of anchor tag. */}
        <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700">Logout</Link>
      </div>
    </>
  );
};

export default ConnectInstagramPage;