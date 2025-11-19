import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface InstagramAccount {
  id: string;
  user_id: string;
  instagram_username: string;
  instagram_user_id: string;
  is_connected: boolean;
  connected_at: string;
  created_at: string;
}

export interface Automation {
  id: string;
  user_id: string;
  name: string;
  trigger_type: 'comments' | 'dms' | 'live' | 'story_replies' | 'story_mentions';
  trigger_config: Record<string, any>;
  response_flow: any[];
  is_active: boolean;
  runs_count: number;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  user_id: string;
  automation_id?: string;
  instagram_username: string;
  instagram_user_id: string;
  name: string;
  profile_picture_url?: string;
  source?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface AutomationRun {
  id: string;
  automation_id: string;
  contact_id?: string;
  status: 'success' | 'failed' | 'pending';
  trigger_data: Record<string, any>;
  response_data: Record<string, any>;
  error_message?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'monthly' | 'annual';
  status: 'active' | 'cancelled' | 'expired';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_user_id?: string;
  referral_code: string;
  status: 'pending' | 'signed_up' | 'converted';
  commission_amount: number;
  created_at: string;
  converted_at?: string;
}
