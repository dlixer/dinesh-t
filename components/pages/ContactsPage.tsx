import React, { useState } from 'react';
import { useContacts } from '../../hooks/useContacts';
import EllipsisVerticalIcon from '../icons/EllipsisVerticalIcon';

const ContactsPage: React.FC = () => {
  const { contacts, loading } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.instagram_username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  return (
    <div className="space-y-6 fade-in-up">
      <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
          <div className="relative">
              <input
                  type="search"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
              </div>
          </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-left text-sm font-semibold text-gray-500 bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Date Added</th>
              <th className="p-4">Source Automation</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="p-4">
                        <div className="flex items-center gap-3">
                            {contact.profile_picture_url ? (
                              <img src={contact.profile_picture_url} alt={contact.name} className="w-10 h-10 rounded-full" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                                {contact.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                                <p className="font-medium text-gray-800">{contact.name || 'Unknown'}</p>
                                <p className="text-sm text-purple-600 font-medium">@{contact.instagram_username}</p>
                            </div>
                        </div>
                    </td>
                    <td className="p-4 text-gray-600">{new Date(contact.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-600">{contact.source || 'N/A'}</td>
                    <td className="p-4 text-right">
                        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700">
                            <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="text-center py-16 px-4">
                        <h3 className="text-lg font-medium text-gray-700">No contacts yet</h3>
                        <p className="text-gray-500 mt-1">Your contacts gathered via automations will appear here.</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;