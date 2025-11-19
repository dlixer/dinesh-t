import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAutomations } from '../../hooks/useAutomations';
import PlusIcon from '../icons/PlusIcon';
import CommentIcon from '../icons/CommentIcon';
import DirectMessageIcon from '../icons/DirectMessageIcon';
import StoryIcon from '../icons/StoryIcon';
import MentionIcon from '../icons/MentionIcon';
import LiveIcon from '../icons/LiveIcon';
import EllipsisVerticalIcon from '../icons/EllipsisVerticalIcon';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import TrashIcon from '../icons/TrashIcon';


const TriggerChip: React.FC<{ type: string }> = ({ type }) => {
    const triggerStyles: { [key: string]: { icon: React.FC<{ className?: string }>, color: string } } = {
        'comments': { icon: CommentIcon, color: 'bg-blue-100 text-blue-700' },
        'dms': { icon: DirectMessageIcon, color: 'bg-yellow-100 text-yellow-700' },
        'live': { icon: LiveIcon, color: 'bg-red-100 text-red-700' },
        'story_replies': { icon: StoryIcon, color: 'bg-pink-100 text-pink-700' },
        'story_mentions': { icon: MentionIcon, color: 'bg-purple-100 text-purple-700' },
    };
    const style = triggerStyles[type] || { icon: CommentIcon, color: 'bg-gray-100 text-gray-700' };
    const Icon = style.icon;

    const displayName = type.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${style.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {displayName}
        </span>
    );
};

const AutomationsPage: React.FC = () => {
    const { automations, loading, deleteAutomation, toggleAutomation } = useAutomations();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [automationToDelete, setAutomationToDelete] = useState<{id: string, name: string} | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleToggleMenu = (id: string) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleDeleteClick = (automation: {id: string, name: string}) => {
        setAutomationToDelete(automation);
        setOpenMenuId(null);
    };

    const confirmDelete = async () => {
        if (automationToDelete) {
          await deleteAutomation(automationToDelete.id);
          setAutomationToDelete(null);
        }
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        await toggleAutomation(id, isActive);
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
        <div className="space-y-6 fade-in-up">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Automations</h1>
            <Link to="/automations/create" className="flex items-center gap-2 btn-primary text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all hover:scale-105">
                <PlusIcon className="w-5 h-5" />
                <span>New Automation</span>
            </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <table className="w-full table-auto">
            <thead className="text-left text-sm font-semibold text-gray-500 bg-gray-50">
                <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Trigger</th>
                <th className="p-4">Runs</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {automations.length > 0 ? (
                    automations.map((auto) => (
                    <tr key={auto.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-800 whitespace-nowrap">{auto.name}</td>
                        <td className="p-4"><TriggerChip type={auto.trigger_type} /></td>
                        <td className="p-4 text-gray-600">{auto.runs_count.toLocaleString()}</td>
                        <td className="p-4">
                        <label htmlFor={`toggle-${auto.id}`} className="cursor-pointer relative inline-block">
                            <input
                              type="checkbox"
                              id={`toggle-${auto.id}`}
                              className="sr-only toggle-checkbox"
                              checked={auto.is_active}
                              onChange={(e) => handleToggleActive(auto.id, e.target.checked)}
                            />
                            <div className="toggle-track w-10 h-6 bg-gray-300 rounded-full transition-colors"></div>
                            <div className="toggle-thumb absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                        </label>
                        </td>
                        <td className="p-4 text-right">
                            <div className="relative inline-block text-left" ref={openMenuId === auto.id ? menuRef : null}>
                                <button
                                onClick={() => handleToggleMenu(auto.id)}
                                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                aria-haspopup="true"
                                aria-expanded={openMenuId === auto.id}
                                >
                                    <span className="sr-only">Open options</span>
                                    <EllipsisVerticalIcon className="w-5 h-5" />
                                </button>
                                {openMenuId === auto.id && (
                                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <Link
                                        to="/automations/new"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick({ id: auto.id, name: auto.name })}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-800"
                                        role="menuitem"
                                    >
                                        Delete
                                    </button>
                                    </div>
                                </div>
                                )}
                            </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center py-12 px-4">
                            <h3 className="text-lg font-medium text-gray-700">No automations found</h3>
                            <p className="text-gray-500 mt-1">Get started by creating your first automation.</p>
                            <Link to="/automations/create" className="mt-4 inline-flex items-center gap-2 btn-primary text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all hover:scale-105">
                                <PlusIcon className="w-5 h-5" />
                                <span>New Automation</span>
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
        <DeleteConfirmationModal
            isOpen={!!automationToDelete}
            onClose={() => setAutomationToDelete(null)}
            onConfirm={confirmDelete}
            itemName={automationToDelete?.name || ''}
        />
    </>
  );
};

export default AutomationsPage;