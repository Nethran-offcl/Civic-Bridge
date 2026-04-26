CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  age INTEGER NOT NULL,
  gender TEXT,
  state TEXT NOT NULL,
  district TEXT,
  occupation TEXT NOT NULL,
  annual_income TEXT,
  caste TEXT,
  disability BOOLEAN DEFAULT false,
  land_holding TEXT,
  preferred_language TEXT DEFAULT 'en',
  family_size INTEGER
);

CREATE TABLE IF NOT EXISTS saved_schemes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS application_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started',
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  scheme_id TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteer_helpers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  district TEXT NOT NULL,
  languages TEXT[],
  contact TEXT,
  is_available BOOLEAN DEFAULT true
);
