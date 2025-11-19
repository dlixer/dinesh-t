import { useState, useEffect } from 'react';
import { supabase, Automation } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useAutomations = () => {
  const { user } = useAuth();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadAutomations();
    } else {
      setAutomations([]);
      setLoading(false);
    }
  }, [user]);

  const loadAutomations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAutomations(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAutomation = async (automation: Partial<Automation>) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { data, error } = await supabase
        .from('automations')
        .insert([{ ...automation, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setAutomations(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  const updateAutomation = async (id: string, updates: Partial<Automation>) => {
    try {
      const { data, error } = await supabase
        .from('automations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setAutomations(prev => prev.map(a => a.id === id ? data : a));
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  const deleteAutomation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('automations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAutomations(prev => prev.filter(a => a.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const toggleAutomation = async (id: string, isActive: boolean) => {
    return updateAutomation(id, { is_active: isActive });
  };

  return {
    automations,
    loading,
    error,
    createAutomation,
    updateAutomation,
    deleteAutomation,
    toggleAutomation,
    refresh: loadAutomations,
  };
};
