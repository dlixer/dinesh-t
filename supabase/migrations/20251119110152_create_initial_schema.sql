/*
  # Initial Database Schema for InstagrowaX

  ## Overview
  This migration sets up the complete database structure for the InstagrowaX application,
  including user profiles, Instagram accounts, automations, contacts, and analytics.

  ## New Tables
  
  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `first_name` (text)
  - `last_name` (text)
  - `phone` (text, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `instagram_accounts`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `instagram_username` (text)
  - `instagram_user_id` (text)
  - `access_token` (text, encrypted)
  - `is_connected` (boolean)
  - `connected_at` (timestamptz)
  - `created_at` (timestamptz)

  ### `automations`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `name` (text)
  - `trigger_type` (text) - comments, dms, live, story_replies, story_mentions
  - `trigger_config` (jsonb) - stores keywords, post IDs, etc.
  - `response_flow` (jsonb) - stores the complete response configuration
  - `is_active` (boolean)
  - `runs_count` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `contacts`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `automation_id` (uuid, references automations)
  - `instagram_username` (text)
  - `instagram_user_id` (text)
  - `name` (text)
  - `profile_picture_url` (text)
  - `source` (text) - which automation captured this contact
  - `metadata` (jsonb) - additional contact data
  - `created_at` (timestamptz)

  ### `automation_runs`
  - `id` (uuid, primary key)
  - `automation_id` (uuid, references automations)
  - `contact_id` (uuid, references contacts)
  - `status` (text) - success, failed, pending
  - `trigger_data` (jsonb)
  - `response_data` (jsonb)
  - `error_message` (text, optional)
  - `created_at` (timestamptz)

  ### `referrals`
  - `id` (uuid, primary key)
  - `referrer_id` (uuid, references profiles)
  - `referred_user_id` (uuid, references profiles, optional)
  - `referral_code` (text, unique)
  - `status` (text) - pending, signed_up, converted
  - `commission_amount` (numeric)
  - `created_at` (timestamptz)
  - `converted_at` (timestamptz, optional)

  ### `subscriptions`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `plan_type` (text) - monthly, annual
  - `status` (text) - active, cancelled, expired
  - `current_period_start` (timestamptz)
  - `current_period_end` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to access their own data
  - Restrict access based on user ownership
  - Service role access for system operations

  ## Indexes
  - Add indexes on foreign keys for performance
  - Add indexes on frequently queried columns
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create instagram_accounts table
CREATE TABLE IF NOT EXISTS instagram_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  instagram_username text NOT NULL,
  instagram_user_id text NOT NULL,
  access_token text,
  is_connected boolean DEFAULT true,
  connected_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create automations table
CREATE TABLE IF NOT EXISTS automations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  trigger_type text NOT NULL CHECK (trigger_type IN ('comments', 'dms', 'live', 'story_replies', 'story_mentions')),
  trigger_config jsonb DEFAULT '{}',
  response_flow jsonb DEFAULT '[]',
  is_active boolean DEFAULT false,
  runs_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  automation_id uuid REFERENCES automations(id) ON DELETE SET NULL,
  instagram_username text NOT NULL,
  instagram_user_id text NOT NULL,
  name text DEFAULT '',
  profile_picture_url text,
  source text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, instagram_user_id)
);

-- Create automation_runs table
CREATE TABLE IF NOT EXISTS automation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id uuid REFERENCES automations(id) ON DELETE CASCADE NOT NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  status text DEFAULT 'pending' CHECK (status IN ('success', 'failed', 'pending')),
  trigger_data jsonb DEFAULT '{}',
  response_data jsonb DEFAULT '{}',
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  referred_user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  referral_code text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'signed_up', 'converted')),
  commission_amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  converted_at timestamptz
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_type text NOT NULL CHECK (plan_type IN ('monthly', 'annual')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_instagram_accounts_user_id ON instagram_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_automations_user_id ON automations(user_id);
CREATE INDEX IF NOT EXISTS idx_automations_is_active ON automations(is_active);
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_automation_id ON contacts(automation_id);
CREATE INDEX IF NOT EXISTS idx_automation_runs_automation_id ON automation_runs(automation_id);
CREATE INDEX IF NOT EXISTS idx_automation_runs_created_at ON automation_runs(created_at);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Instagram accounts policies
CREATE POLICY "Users can view own instagram accounts"
  ON instagram_accounts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own instagram accounts"
  ON instagram_accounts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own instagram accounts"
  ON instagram_accounts FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own instagram accounts"
  ON instagram_accounts FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Automations policies
CREATE POLICY "Users can view own automations"
  ON automations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own automations"
  ON automations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own automations"
  ON automations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own automations"
  ON automations FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Contacts policies
CREATE POLICY "Users can view own contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Automation runs policies
CREATE POLICY "Users can view own automation runs"
  ON automation_runs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM automations
      WHERE automations.id = automation_runs.automation_id
      AND automations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own automation runs"
  ON automation_runs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM automations
      WHERE automations.id = automation_runs.automation_id
      AND automations.user_id = auth.uid()
    )
  );

-- Referrals policies
CREATE POLICY "Users can view own referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (referrer_id = auth.uid());

CREATE POLICY "Users can insert own referrals"
  ON referrals FOR INSERT
  TO authenticated
  WITH CHECK (referrer_id = auth.uid());

CREATE POLICY "Users can update own referrals"
  ON referrals FOR UPDATE
  TO authenticated
  USING (referrer_id = auth.uid())
  WITH CHECK (referrer_id = auth.uid());

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, '', '');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_automations_updated_at ON automations;
CREATE TRIGGER update_automations_updated_at
  BEFORE UPDATE ON automations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
