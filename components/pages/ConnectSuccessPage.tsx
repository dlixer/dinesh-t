import React from 'react';
// FIX: Rewriting import to fix potential tooling issues.
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import InstagramGlyphIcon from '../icons/InstagramGlyphIcon';

const ConnectSuccessPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/paymentplan');
    };

  return (
    <>
      <div className="text-center space-y-6">
        <div className="flex justify-center">
             <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <InstagramGlyphIcon className="w-12 h-12 text-green-600" />
            </div>
        </div>
        <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                Successfully Connected! <CheckCircleIcon className="w-6 h-6 text-green-500" />
            </h2>
            <p className="text-gray-600 mt-2">Your Instagram account is ready to go.</p>
        </div>
        <button
          onClick={handleNext}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white btn-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ConnectSuccessPage;
