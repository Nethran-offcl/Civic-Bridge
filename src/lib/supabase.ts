import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabaseClientEnv = Boolean(supabaseUrl && supabaseAnonKey);
export const hasSupabaseAdminEnv = Boolean(supabaseUrl && supabaseServiceRoleKey);

export const supabase = hasSupabaseClientEnv
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export const supabaseAdmin = hasSupabaseAdminEnv
  ? createClient(supabaseUrl as string, supabaseServiceRoleKey as string, {
      auth: {
        persistSession: false
      }
    })
  : null;
