import React, { useState } from 'react';
// FIX: Rewriting import to fix potential tooling issues.
import { Link, useNavigate } from 'react-router-dom';
import StarIcon from '../icons/StarIcon';
import TagIcon from '../icons/TagIcon';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const PaymentPlanPage: React.FC = () => {
    const [plan, setPlan] = useState('annual');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        setIsLoading(true);
        // Simulate successful payment and redirect to the dashboard
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    }

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Choose Your Plan</h2>
        <p className="text-gray-600 mt-1">Unlock your Instagram's full potential.</p>
      </div>

      <div className="space-y-4">
          {/* Annual Plan */}
          <div onClick={() => setPlan('annual')} className={`p-4 border-2 rounded-2xl cursor-pointer transition-all relative ${plan === 'annual' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
               {plan === 'annual' && (
                  <div className="absolute -top-3 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                  </div>
              )}
              <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${plan === 'annual' ? 'border-purple-600' : 'border-gray-400'}`}>
                          {plan === 'annual' && <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>}
                      </div>
                      <span className="font-bold text-gray-800">Annual</span>
                  </div>
                  <div className="text-right">
                     <p className="font-bold text-lg text-purple-600">₹399/mo</p>
                     <p className="text-xs text-gray-500 line-through">₹999/mo</p>
                  </div>
              </div>
              <div className="pl-8 mt-1">
                  <span className="text-xs font-medium text-purple-700">Billed annually, save 60%</span>
              </div>
          </div>

          {/* Monthly Plan */}
           <div onClick={() => setPlan('monthly')} className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${plan === 'monthly' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
              <div className="flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${plan === 'monthly' ? 'border-purple-600' : 'border-gray-400'}`}>
                          {plan === 'monthly' && <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>}
                      </div>
                      <span className="font-bold text-gray-800">Monthly</span>
                  </div>
                  <div className="text-right">
                     <p className="font-bold text-lg text-gray-800">₹799/mo</p>
                     <p className="text-xs text-gray-500">Billed monthly</p>
                  </div>
              </div>
          </div>
      </div>
      
      {/* Features */}
      <div className="mt-8 bg-slate-50 p-6 rounded-2xl">
        <p className="text-sm font-semibold text-center text-gray-700">All plans include:</p>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 text-sm">
            <li className="flex items-center gap-3"><CheckIcon /> Unlimited Automation</li>
            <li className="flex items-center gap-3"><CheckIcon /> Unlimited Contacts</li>
            <li className="flex items-center gap-3"><CheckIcon /> Re-Trigger on existing comments</li>
            <li className="flex items-center gap-3"><CheckIcon /> Priority Queue & Support</li>
            <li className="flex items-center gap-3"><CheckIcon /> AI Automation Builder</li>
            <li className="flex items-center gap-3"><CheckIcon /> Detailed Analytics</li>
        </ul>
      </div>

      <div className="mt-8 text-center space-y-3">
          <button 
            onClick={handleContinue} 
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg font-medium text-white btn-primary transition-all duration-300 disabled:opacity-50 hover:scale-105">
              {isLoading ? 'Redirecting...' : 'Continue to Payment'}
          </button>
           <p className="text-xs text-gray-500 mt-4">
              7-day money-back guarantee.
          </p>
           {/* FIX: Using Link for SPA navigation instead of anchor tag. */}
           <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 pt-2 block">Logout</Link>
      </div>
    </>
  );
};


export default PaymentPlanPage;
