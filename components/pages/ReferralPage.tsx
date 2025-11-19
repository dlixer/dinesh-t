import React, { useState } from 'react';
import { useReferrals } from '../../hooks/useReferrals';
import GiftIcon from '../icons/GiftIcon';
import CopyIcon from '../icons/CopyIcon';

const ReferralPage: React.FC = () => {
  const { referralCode, stats, loading } = useReferrals();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://instagrowax.com/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in-up">
      <div className="text-center">
          <GiftIcon className="w-16 h-16 mx-auto text-purple-500" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Refer & Earn</h1>
          <p className="text-lg text-gray-600 mt-2">
              Share InstagrowaX with your friends and earn 30% commission on their first payment!
          </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <h3 className="font-semibold text-gray-700">Your unique referral link</h3>
          <div className="mt-4 flex items-center justify-center gap-2">
              <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-center"
              />
              <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-lg font-medium text-white btn-primary transition-all"
              >
                  <CopyIcon className="w-5 h-5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
              <p className="text-3xl font-bold text-purple-600">{stats.signups}</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Referral Signups</p>
          </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200">
              <p className="text-3xl font-bold text-purple-600">{stats.conversions}</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Successful Conversions</p>
          </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200">
              <p className="text-3xl font-bold text-purple-600">₹{stats.earnings.toFixed(2)}</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Total Earnings</p>
          </div>
      </div>
    </div>
  );
};

export default ReferralPage;