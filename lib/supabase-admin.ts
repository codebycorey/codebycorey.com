import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const SupabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_KEY || '');

export { SupabaseAdmin };
