import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AutomationIcon from '../icons/AutomationIcon';

const CreateAutomationPage: React.FC = () => {
    const [automationName, setAutomationName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd pass this name to the builder.
        // For this example, we'll just navigate.
        navigate('/automations/new');
    };

    return (
        <div className="max-w-2xl mx-auto mt-12 fade-in-up">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                    <AutomationIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mt-4">Let's start with a name</h1>
                <p className="text-gray-600 mt-2">Give your automation a name so you can easily find it later.</p>
                
                <form className="mt-8 max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="automationName" className="sr-only">Automation Name</label>
                        <input
                            id="automationName"
                            name="automationName"
                            type="text"
                            value={automationName}
                            onChange={(e) => setAutomationName(e.target.value)}
                            required
                            className="w-full text-center text-lg px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            placeholder="e.g., 'Welcome DM for New Followers'"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={!automationName.trim()}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white btn-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                        >
                            Create & Continue to Builder
                        </button>
                    </div>
                     <div className="text-center pt-2">
                        <Link to="/automations" className="font-medium text-sm text-gray-500 hover:text-gray-700">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAutomationPage;