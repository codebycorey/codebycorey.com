'use server';

import { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServerKey = process.env.SUPABASE_SERVICE_KEY || '';

const SupabaseAdmin = createClient<Database>(supabaseUrl, supabaseServerKey);

export const fetchAndIncrementViewCount = async (
  slug: string
): Promise<number | null> => {
  SupabaseAdmin.rpc('increment_page_view', {
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

export const fetchAllViewCounts = async (): Promise<Record<string, number>> => {
  const { data } = await SupabaseAdmin.from('pages').select('*');
  // efficient way to lookup slug to view_count later
  const viewCounts: Record<string, number> = {};
  if (data) {
    data.forEach((page) => {
      viewCounts[page.slug] = page.view_count;
    });
  }
  return viewCounts;
};
