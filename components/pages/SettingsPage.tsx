import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import UserIcon from '../icons/UserIcon';

const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-4 mb-6">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const SettingsPage: React.FC = () => {
  const { user, profile, updateProfile, signOut } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [instagramAccount, setInstagramAccount] = useState<any>(null);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
    }
  }, [profile]);

  useEffect(() => {
    loadInstagramAccount();
  }, [user]);

  const loadInstagramAccount = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('instagram_accounts')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    setInstagramAccount(data);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await updateProfile({
      first_name: firstName,
      last_name: lastName,
    });

    if (error) {
      setMessage('Failed to update profile');
    } else {
      setMessage('Profile updated successfully!');
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDisconnectInstagram = async () => {
    if (!instagramAccount) return;
    await supabase
      .from('instagram_accounts')
      .delete()
      .eq('id', instagramAccount.id);
    setInstagramAccount(null);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in-up">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      <SettingsCard title="Profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
              </div>
              <div>
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
              </div>
          </div>
           <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
          </div>
          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          <div className="pt-4 text-right">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-4 py-2 rounded-lg font-medium text-white btn-primary transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
          </div>
      </SettingsCard>

      <SettingsCard title="Instagram Account">
          {instagramAccount ? (
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-gray-500" />
                     </div>
                    <div>
                        <p className="font-bold text-gray-800">@{instagramAccount.instagram_username}</p>
                        <p className="text-sm text-green-700">Connected</p>
                    </div>
                </div>
                 <button
                   onClick={handleDisconnectInstagram}
                   className="px-4 py-2 text-sm rounded-lg font-medium text-red-700 bg-red-100 hover:bg-red-200"
                 >
                   Disconnect
                 </button>
            </div>
          ) : (
            <div className="text-center p-4 text-gray-500">
              <p>No Instagram account connected</p>
            </div>
          )}
      </SettingsCard>
      
      <SettingsCard title="Account Actions">
          <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm rounded-lg font-medium text-red-700 bg-red-100 hover:bg-red-200"
              >
                Logout
              </button>
          </div>
      </SettingsCard>
    </div>
  );
};

export default SettingsPage;