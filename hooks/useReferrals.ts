import { useState, useEffect } from 'react';
import { supabase, Referral } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useReferrals = () => {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState<string>('');
  const [stats, setStats] = useState({
    signups: 0,
    conversions: 0,
    earnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadReferralData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadReferralData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let { data: existingReferral } = await supabase
        .from('referrals')
        .select('referral_code')
        .eq('referrer_id', user.id)
        .maybeSingle();

      if (!existingReferral) {
        const code = generateReferralCode();
        const { data } = await supabase
          .from('referrals')
          .insert([{ referrer_id: user.id, referral_code: code }])
          .select('referral_code')
          .single();

        existingReferral = data;
      }

      setReferralCode(existingReferral?.referral_code || '');

      const { data: referrals } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id);

      if (referrals) {
        const signups = referrals.filter(r => r.status !== 'pending').length;
        const conversions = referrals.filter(r => r.status === 'converted').length;
        const earnings = referrals.reduce((sum, r) => sum + (r.commission_amount || 0), 0);

        setStats({ signups, conversions, earnings });
      }
    } catch (err) {
      console.error('Error loading referral data:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return {
    referralCode,
    stats,
    loading,
    refresh: loadReferralData,
  };
};
