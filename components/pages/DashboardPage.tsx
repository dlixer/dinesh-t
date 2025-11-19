import React from 'react';
import { Link } from 'react-router-dom';
import { useAnalytics } from '../../hooks/useAnalytics';
import SparkleIcon from '../icons/SparkleIcon';
import PlusIcon from '../icons/PlusIcon';
import AutomationIcon from '../icons/AutomationIcon';
import ContactsIcon from '../icons/ContactsIcon';
import StoryIcon from '../icons/StoryIcon';
import AnalyticsChart from '../charts/AnalyticsChart';
import CommentIcon from '../icons/CommentIcon';
import DirectMessageIcon from '../icons/DirectMessageIcon';
import MentionIcon from '../icons/MentionIcon';

const StatCard: React.FC<{ title: string; value: string; description: string, icon: React.ReactNode }> = ({ title, value, description, icon }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm flex items-start gap-4 transition-all hover:shadow-md hover:-translate-y-1">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-1">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
  const { analytics, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in-up">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back! 👋</h1>
          <Link to="/automations/create" className="flex items-center justify-center gap-2 btn-primary text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all hover:scale-105">
              <PlusIcon className="w-5 h-5" />
              <span>New Automation</span>
          </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Active Automations"
            value={analytics.activeAutomations.toString()}
            description={analytics.activeAutomations === 0 ? "No running workflows" : "Running workflows"}
            icon={<AutomationIcon className="w-6 h-6 text-purple-600" />}
          />
          <StatCard
            title="Contacts Gathered"
            value={analytics.contactsGathered.toString()}
            description={analytics.contactsGathered === 0 ? "No contacts yet" : "Total contacts"}
            icon={<ContactsIcon className="w-6 h-6 text-purple-600" />}
          />
          <StatCard
            title="Story Replies Sent"
            value={analytics.storyRepliesSent.toString()}
            description={analytics.storyRepliesSent === 0 ? "No replies sent" : "Total replies"}
            icon={<StoryIcon className="w-6 h-6 text-purple-600" />}
          />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacts Growth</h3>
          {analytics.chartData.length > 0 ? (
            <AnalyticsChart data={analytics.chartData} />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
                No analytics data available yet.
            </div>
          )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Idea Generator */}
        <div className="bg-gray-800 p-8 rounded-xl text-white relative overflow-hidden border border-purple-500/30 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-purple-500/20 rounded-full filter blur-3xl"></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    Need an idea?
                    <SparkleIcon className="w-6 h-6 text-yellow-300" />
                </h2>
                <p className="mt-2 max-w-2xl text-gray-300">
                    Let our AI brainstorm a custom automation strategy for you.
                </p>
            </div>
            <Link to="/automations/create" className="mt-6 relative z-10 self-start bg-white text-purple-600 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                Generate with AI
            </Link>
        </div>


        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            {analytics.recentActivities.length > 0 ? (
                <ul className="mt-4 space-y-1 text-sm">
                    {analytics.recentActivities.map((activity, index) => (
                        <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                                    <AutomationIcon className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">{activity.text}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                            <span className={`font-semibold text-xs px-2 py-1 rounded-full ${
                                activity.status === 'Success'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {activity.status}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-500 py-8">
                    No recent activity to show.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;