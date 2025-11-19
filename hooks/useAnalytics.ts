import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface AnalyticsData {
  activeAutomations: number;
  contactsGathered: number;
  storyRepliesSent: number;
  chartData: { name: string; value: number }[];
  recentActivities: any[];
}

export const useAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    activeAutomations: 0,
    contactsGathered: 0,
    storyRepliesSent: 0,
    chartData: [],
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAnalytics();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const [automationsRes, contactsRes, runsRes] = await Promise.all([
        supabase.from('automations').select('id, is_active').eq('is_active', true),
        supabase.from('contacts').select('id, created_at'),
        supabase.from('automation_runs').select('id, status, created_at').limit(10).order('created_at', { ascending: false }),
      ]);

      const activeAutomations = automationsRes.data?.length || 0;
      const contactsGathered = contactsRes.data?.length || 0;

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: 0,
        };
      });

      if (contactsRes.data) {
        contactsRes.data.forEach(contact => {
          const date = new Date(contact.created_at);
          const dayIndex = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
          if (dayIndex >= 0 && dayIndex < 7) {
            last7Days[6 - dayIndex].value++;
          }
        });
      }

      const recentActivities = (runsRes.data || []).map(run => ({
        text: 'Automation executed',
        time: new Date(run.created_at).toLocaleTimeString(),
        status: run.status === 'success' ? 'Success' : 'Failed',
      }));

      setAnalytics({
        activeAutomations,
        contactsGathered,
        storyRepliesSent: 0,
        chartData: last7Days,
        recentActivities,
      });
    } catch (err) {
      console.error('Error loading analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  return { analytics, loading, refresh: loadAnalytics };
};
