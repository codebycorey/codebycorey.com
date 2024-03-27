'use server';

import { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServerKey = process.env.SUPABASE_SERVICE_KEY || '';

const SupabaseAdmin = createClient<Database>(supabaseUrl, supabaseServerKey);

export const fetchAndIncrementViewCount = async (
  slug: string
): Promise<number | null> => {
  await SupabaseAdmin.rpc('increment_page_view', {
    page_slug: slug,
  });
  return fetchViewCount(slug);
};

export const fetchViewCount = async (slug: string): Promise<number | null> => {
  const { data } = await SupabaseAdmin.from('pages')
    .select('view_count')
    .eq('slug', slug);

  if (data && data.length > 0) {
    return data[0].view_count;
  }

  return null;
};

export const fetchAllViewCounts = async () => {
  const { data } = await SupabaseAdmin.from('pages').select();
  console.log('ALL DATA', data);
};
