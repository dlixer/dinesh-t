import React, { useState } from 'react';
import SparkleIcon from '../icons/SparkleIcon';
import TriggerIcon from '../icons/TriggerIcon';
import DirectMessageIcon from '../icons/DirectMessageIcon';
import CloseIcon from '../icons/CloseIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';

// --- Reusable & Generic Components ---

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative group flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div className="absolute bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      {text}
    </div>
  </div>
);

const SectionCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);


// --- Trigger-Specific Components ---

const triggerOptions = [
    { id: 'comments', label: 'User Comments on your post or reel', icon: '📷' },
    { id: 'dms', label: 'User DMs to you', icon: '✉️' },
    { id: 'live', label: 'User Comments on your LIVE', icon: '🔴' },
    { id: 'story_replies', label: 'User replies to your stories', icon: '📖' },
    { id: 'story_mentions', label: 'User mentions you in story', icon: '👤', comingSoon: true },
];

interface TriggerSelectorProps {
    onSelect: (triggerId: string) => void;
}

const TriggerSelector: React.FC<TriggerSelectorProps> = ({ onSelect }) => (
    <>
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <TriggerIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-800">Select a Trigger</h2>
                <p className="text-sm text-gray-500">When to run automation</p>
            </div>
        </div>
        <div className="space-y-2">
            {triggerOptions.map(option => (
                <button
                    key={option.id}
                    onClick={() => !option.comingSoon && onSelect(option.id)}
                    disabled={option.comingSoon}
                    className="w-full text-left flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <span className="font-medium text-gray-700">{option.icon} {option.label}</span>
                    {option.comingSoon && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">Coming Soon</span>}
                </button>
            ))}
        </div>
    </>
);

const ConfigPlaceholder: React.FC<{ icon: React.ReactNode; text: string; onClick?: () => void }> = ({ icon, text, onClick }) => (
    <div 
        onClick={onClick} 
        className={`bg-slate-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center ${onClick ? 'cursor-pointer hover:border-purple-400 hover:bg-purple-50' : ''} transition-all group`}
    >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-500 transition-colors">
            {icon}
        </div>
        <p className="font-semibold text-gray-600 group-hover:text-purple-600 transition-colors">{text}</p>
    </div>
);


// --- Response Flow Components ---

const CardMessageEditor = ({ onRemove }) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Card Message</h3>
                <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="space-y-4">
                 <ConfigPlaceholder 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>} 
                    text="Select an Image" 
                />
                <div>
                    <label className="text-sm font-medium text-gray-600">Title</label>
                    <input type="text" placeholder="Enter title" className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-600">Subtitle</label>
                    <input type="text" placeholder="Enter subtitle" className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Buttons</label>
                     <button className="mt-1 w-full flex items-center justify-center gap-2 p-2 border border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors">
                        <PlusIcon className="w-4 h-4 text-purple-500" />
                        <span className="font-medium text-sm text-purple-600">Add Button</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const TextMessageEditor = ({ onRemove }) => {
    const [text, setText] = useState('');
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 relative">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Text Message</h3>
                <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="relative">
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text..." 
                    className="w-full p-2 pr-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    maxLength={1000}
                />
                <span className="absolute bottom-2 right-3 text-xs text-gray-400">{text.length}/1000</span>
            </div>
            <button className="mt-2 w-full flex items-center justify-center gap-2 p-2 border border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors">
                <PlusIcon className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-sm text-purple-600">Add Button</span>
            </button>
        </div>
    );
}

const PlaceholderEditor = ({ title, onRemove }) => (
     <div className="bg-white p-4 rounded-xl border border-gray-200 relative">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Configuration for this response type is coming soon.</p>
    </div>
);


// --- Modal Components ---

const KeywordModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [keywords, setKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            setKeywords([...keywords, inputValue.trim()]);
            setInputValue('');
        }
    };
    
    const removeKeyword = (indexToRemove) => {
        setKeywords(keywords.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Setup Keywords</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><CloseIcon className="w-6 h-6" /></button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Keywords are not case-sensitive, e.g., 'link' and 'Link' are recognized as the same.</p>
                <div className="p-2 border border-gray-300 rounded-lg flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                        <div key={index} className="bg-purple-100 text-purple-700 text-sm font-medium px-2 py-1 rounded-md flex items-center gap-1">
                            {keyword}
                            <button onClick={() => removeKeyword(index)} className="text-purple-500 hover:text-purple-700">
                                <CloseIcon className="w-3 h-3"/>
                            </button>
                        </div>
                    ))}
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type & Hit Enter to add Keyword" 
                        className="flex-1 bg-transparent focus:outline-none p-1"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="w-full py-2 px-4 rounded-lg font-medium text-white btn-primary transition-all">Confirm</button>
                </div>
            </div>
        </div>
    );
};

const AddResponseModal = ({ isOpen, onClose, onSelect, isOpeningMessageEnabled }) => {
    if (!isOpen) return null;
    
    const responseOptions = [
        { type: 'ask_follow', title: 'Ask For Follow', description: 'Request users to follow your account', requiresOpening: true },
        { type: 'card', title: 'Card Message', description: 'Send a rich card with Image, Texts and Button', requiresOpening: false },
        { type: 'text', title: 'Text Message', description: 'Send a simple Text or Button Response', requiresOpening: false },
        { type: 'lead_form', title: 'Lead Forms', description: 'Request users to input text', requiresOpening: true, isBeta: true },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Add Response</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><CloseIcon className="w-6 h-6" /></button>
                </div>

                {!isOpeningMessageEnabled && (
                    <div className="p-3 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                        Opening message is turned off, only one of Text or Cards is allowed.
                    </div>
                )}

                <div className="space-y-3">
                    {responseOptions.map(option => {
                        const isDisabled = option.requiresOpening && !isOpeningMessageEnabled;
                        return (
                             <button
                                key={option.type}
                                disabled={isDisabled}
                                onClick={() => { onSelect(option.type); onClose(); }}
                                className={`w-full text-left p-3 border rounded-lg transition-all ${isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'hover:border-purple-500 hover:bg-purple-50'}`}
                            >
                                <div className="font-bold text-gray-800 flex items-center">{option.title} {option.isBeta && <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">BETA</span>}</div>
                                <p className="text-sm text-gray-600">{option.description}</p>
                                {option.requiresOpening && <p className="text-xs text-orange-600 mt-1">Requires Opening Message</p>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}


// --- Main Page Component ---

const AutomationBuilderPage: React.FC = () => {
    const [automationName, setAutomationName] = useState('My First Automation');
    const [isActive, setIsActive] = useState(false);
    const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
    const [isKeywordModalOpen, setKeywordModalOpen] = useState(false);
    const [responseFlow, setResponseFlow] = useState([]);
    const [isOpeningMessageEnabled, setOpeningMessageEnabled] = useState(false);
    const [isAddResponseModalOpen, setAddResponseModalOpen] = useState(false);


    const handleSelectTrigger = (triggerId: string) => {
        setSelectedTrigger(triggerId);
    };

    const handleResetTrigger = () => {
        setSelectedTrigger(null);
    };

    const addResponseComponent = (type: string) => {
        const newResponse = { id: Date.now(), type }; // Simple unique ID
        setResponseFlow([...responseFlow, newResponse]);
    };
    
    const removeResponse = (idToRemove) => {
        setResponseFlow(responseFlow.filter(res => res.id !== idToRemove));
    };
    
    const renderResponseComponent = (res) => {
        switch (res.type) {
            case 'card':
                return <CardMessageEditor onRemove={() => removeResponse(res.id)} />;
            case 'text':
                return <TextMessageEditor onRemove={() => removeResponse(res.id)} />;
            case 'ask_follow':
                return <PlaceholderEditor title="Ask For Follow" onRemove={() => removeResponse(res.id)} />;
            case 'lead_form':
                return <PlaceholderEditor title="Lead Form" onRemove={() => removeResponse(res.id)} />;
            default:
                return null;
        }
    }

    const getTriggerLabel = () => {
        return triggerOptions.find(t => t.id === selectedTrigger)?.label || 'Unknown Trigger';
    };
    
    const renderTriggerConfig = () => {
        switch(selectedTrigger) {
            case 'comments':
            case 'live':
            case 'story_replies':
                return (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700">Which Post or Reel do you want to use?</h3>
                        <ConfigPlaceholder 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>} 
                            text="Select Post or Reel" 
                        />
                         <h3 className="font-semibold text-gray-700">What keywords will start your automation?</h3>
                        <ConfigPlaceholder 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>} 
                            text="Setup Keywords"
                            onClick={() => setKeywordModalOpen(true)}
                        />
                        <h3 className="font-semibold text-gray-700">What do you want to reply to those comments?</h3>
                         <ConfigPlaceholder 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} 
                            text="Setup Comment Replies"
                        />
                    </div>
                );
            case 'dms':
                 return (
                    <div className="space-y-4">
                         <h3 className="font-semibold text-gray-700">What keywords in DMs will trigger your automation?</h3>
                        <ConfigPlaceholder 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>} 
                            text="Setup Keywords"
                            onClick={() => setKeywordModalOpen(true)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen bg-slate-50 fade-in-up">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <input 
                    type="text" 
                    value={automationName} 
                    onChange={(e) => setAutomationName(e.target.value)}
                    className="font-bold text-gray-800 text-lg border-b-2 border-transparent focus:border-purple-500 focus:outline-none bg-transparent"
                />
                <div className="flex items-center gap-4">
                    <label htmlFor="toggle-active" className="flex items-center cursor-pointer">
                        <span className={`mr-3 font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                           {isActive ? 'Active' : 'Inactive'}
                        </span>
                        <div className="relative">
                            <input type="checkbox" id="toggle-active" className="sr-only toggle-checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                            <div className="toggle-track w-10 h-6 bg-gray-300 rounded-full transition-colors"></div>
                            <div className="toggle-thumb absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                        </div>
                    </label>
                    <button className="px-4 py-2 rounded-lg font-medium text-white btn-primary transition-all shadow-sm">Save Automation</button>
                </div>
            </div>

            {/* Builder Canvas */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Trigger Column */}
                <SectionCard>
                    {!selectedTrigger ? (
                        <TriggerSelector onSelect={handleSelectTrigger} />
                    ) : (
                        <div>
                             <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                                        <TriggerIcon className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">{getTriggerLabel()}</h2>
                                </div>
                                <button onClick={handleResetTrigger} className="text-gray-400 hover:text-gray-600"><CloseIcon className="w-6 h-6" /></button>
                            </div>
                            {renderTriggerConfig()}
                        </div>
                    )}
                </SectionCard>

                {/* Response Flow Column */}
                <SectionCard>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Response Flow</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                           <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">Opening Message</span>
                                <InfoTooltip text="This is the first message sent to the user." />
                           </div>
                            <label htmlFor="toggle-opening-msg" className="cursor-pointer relative">
                                <input type="checkbox" id="toggle-opening-msg" className="sr-only toggle-checkbox" checked={isOpeningMessageEnabled} onChange={() => setOpeningMessageEnabled(!isOpeningMessageEnabled)} />
                                <div className="toggle-track w-10 h-6 bg-gray-300 rounded-full transition-colors"></div>
                                <div className="toggle-thumb absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                            </label>
                        </div>

                        {/* Dynamic Response Components */}
                        {responseFlow.map((res, index) => (
                           <div key={res.id} className="flex items-start gap-3">
                               <div className="flex-shrink-0 w-8 h-8 mt-2 bg-gray-700 text-white font-bold text-sm rounded-full flex items-center justify-center">
                                   {index + 1}
                               </div>
                               <div className="flex-1">
                                   {renderResponseComponent(res)}
                               </div>
                           </div>
                        ))}

                        <button 
                            onClick={() => setAddResponseModalOpen(true)}
                            className="w-full py-3 px-4 rounded-lg font-medium text-white btn-primary transition-all flex items-center justify-center gap-2"
                        >
                           <PlusIcon className="w-5 h-5" />
                           Add Response
                        </button>
                    </div>
                </SectionCard>
            </div>

            <KeywordModal isOpen={isKeywordModalOpen} onClose={() => setKeywordModalOpen(false)} />
            <AddResponseModal 
                isOpen={isAddResponseModalOpen}
                onClose={() => setAddResponseModalOpen(false)}
                onSelect={addResponseComponent}
                isOpeningMessageEnabled={isOpeningMessageEnabled}
            />
        </div>
    );
};

export default AutomationBuilderPage;