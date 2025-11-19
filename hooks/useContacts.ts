import { useState, useEffect } from 'react';
import { supabase, Contact } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useContacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadContacts();
    } else {
      setContacts([]);
      setLoading(false);
    }
  }, [user]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contact: Partial<Contact>) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ ...contact, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setContacts(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  return {
    contacts,
    loading,
    error,
    createContact,
    refresh: loadContacts,
  };
};
