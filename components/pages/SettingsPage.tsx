import React from 'react';
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
  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in-up">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      <SettingsCard title="Profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" placeholder="Jane" className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              </div>
              <div>
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" placeholder="Doe" className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              </div>
          </div>
           <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" placeholder="jane.doe@example.com" disabled className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"/>
          </div>
          <div className="pt-4 text-right">
              <button className="px-4 py-2 rounded-lg font-medium text-white btn-primary transition-all">Save Changes</button>
          </div>
      </SettingsCard>

      <SettingsCard title="Instagram Account">
          <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-gray-500" />
                   </div>
                  <div>
                      <p className="font-bold text-gray-800">@your_instagram</p>
                      <p className="text-sm text-green-700">Connected</p>
                  </div>
              </div>
               <button className="px-4 py-2 text-sm rounded-lg font-medium text-red-700 bg-red-100 hover:bg-red-200">Disconnect</button>
          </div>
      </SettingsCard>
      
      <SettingsCard title="Billing & Plan">
          <div className="flex items-center justify-between">
              <div>
                  <p className="font-bold text-gray-800">Pro Plan (Annual)</p>
                  <p className="text-sm text-gray-500">Next billing on Dec 25, 2024</p>
              </div>
               <button className="px-4 py-2 text-sm rounded-lg font-medium text-purple-600 bg-purple-100 hover:bg-purple-200">Manage Subscription</button>
          </div>
      </SettingsCard>
    </div>
  );
};

export default SettingsPage;